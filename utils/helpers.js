const Profile = require('../models/Profile');
const config = require('config');
const axios = require('axios');

const CODEX_COMPILER_API_URL = 'https://api.codex.jaagrav.in';
const CODEX_COMPILER_API_LANGUAGE = 'cpp';
const JOODLE_COMPILER_API_URL = 'https://api.jdoodle.com/v1/execute';
const JOODLE_COMPILER_API_LANGUAGE = 'cpp';
const JOODLE_COMPILER_API_COMPILER_INDEX = 5;
const JOODLE_CLIENT_ID =
  process.env.joodleClientId || config.get('joodleClientId');
const JOODLE_CLIENT_SECRET =
  process.env.joodleClientSecret || config.get('joodleClientSecret');

function calculateScore(passedTests, totalTests) {
  const percentage = (passedTests / totalTests) * 100;
  return parseFloat(percentage.toFixed(2));
}

function checkQuizAnswers(userAnswers = [], rightAnswers = []) {
  if (userAnswers.length !== rightAnswers.length) {
    return -1;
  }
  for (const answer of rightAnswers) {
    if (!userAnswers.includes(answer._id.toHexString())) return -1;
  }
  return 0;
}

function failedQuizzesContainsCurrentQuiz(failedQuizzes, quizId) {
  for (const failedQuiz of failedQuizzes) {
    if (quizId === failedQuiz.quiz.toHexString()) return true;
  }
  return false;
}

function filterFailedQuizzes(failedQuizzes) {
  return failedQuizzes.filter(
    (quiz) =>
      !(
        new Date(quiz.date.getTime() + 1000 * 60 * quiz.waitingMinutes) <
        Date.now()
      )
  );
}

async function updateProfile(status, githubUsername, user_id) {
  if (status !== undefined || githubUsername !== undefined) {
    const profile = await Profile.findOne({
      user: user_id,
    });
    if (profile) {
      profile.status = status;
      profile.githubUsername = githubUsername;
      profile.save();
    }
  }
}

function markProblemAsSolved(solution, protocol, host) {
  const privateRouteKey =
    process.env.privateRouteKey || config.get('privateRouteKey');
  axios
    .post(
      `${protocol}://${host}/api/learning-materials/problems/${solution.problem._id}/${solution.user._id}/problem-solved`,
      {},
      {
        headers: {
          Authorization: `Bearer ${privateRouteKey}`,
        },
      }
    )
    .catch((error) => {
      console.error(error);
    });
}

async function sendSolutionToJaagravCodexAPI(solution, test) {
  let passedTest = false;
  let compilationError = null;

  const data = {
    code: solution.code,
    language: CODEX_COMPILER_API_LANGUAGE,
    input: test.input,
  };

  try {
    const response = await axios.post(CODEX_COMPILER_API_URL, data);
    if (response.data['error'] === '' && response.data['output'] === '') {
      // If the response has no error or output, retry the test after 1 second
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post(CODEX_COMPILER_API_URL, data)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        }, 1000);
      });
    } else {
      if (response.data['error'] !== '') {
        compilationError = response.data['error'];
      } else {
        if (response.data['output'] === test.output) {
          passedTest = true;
        }
      }
    }
    return { passedTest, compilationError };
  } catch (error) {
    console.error(error);
    return { passedTest, compilationError: 'Server Error' };
  }
}

async function sendSolutionToJoodleAPI(solution, test) {
  let passedTest = false;
  let compilationError = null;

  const data = {
    clientId: JOODLE_CLIENT_ID,
    clientSecret: JOODLE_CLIENT_SECRET,
    script: solution.code,
    stdin: test.input,
    language: JOODLE_COMPILER_API_LANGUAGE,
    versionIndex: JOODLE_COMPILER_API_COMPILER_INDEX,
    compileOnly: false,
  };

  try {
    const response = await axios.post(JOODLE_COMPILER_API_URL, data);
    if (response.data['memory'] === null) {
      compilationError = response.data['output'];
    } else {
      if (response.data['output'] === test.output) {
        passedTest = true;
      }
    }
    return { passedTest, compilationError };
  } catch (error) {
    console.error(error);
    return { passedTest, compilationError: 'Server Error' };
  }
}

function updateSolution(solution, testsTotals, compilationError) {
  const passedTests = testsTotals.passedTests;
  const totalTests = testsTotals.totalTests;
  const newScore = calculateScore(passedTests, totalTests);
  if (compilationError !== null) {
    solution.status = 'compilation error';
  } else {
    solution.score = newScore;
    solution.status = newScore === 100 ? 'accepted' : 'incorrect';
  }
  solution.totalTests = totalTests;
  solution.passedTests = passedTests;
}

module.exports = {
  calculateScore,
  checkQuizAnswers,
  failedQuizzesContainsCurrentQuiz,
  filterFailedQuizzes,
  markProblemAsSolved,
  sendSolutionToJaagravCodexAPI,
  sendSolutionToJoodleAPI,
  updateProfile,
  updateSolution,
};

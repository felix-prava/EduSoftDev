const Profile = require('../models/Profile');
const COMPILER_API_URL = 'https://api.codex.jaagrav.in';
const axios = require('axios');

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

async function sendSolutionToJaagravCodexAPI(solution, test) {
  let passedTest = false;
  let compilationError = null;

  const data = {
    code: solution.code,
    language: 'cpp',
    input: test.input,
  };

  try {
    const response = await axios.post(COMPILER_API_URL, data);
    if (response.data['error'] === '' && response.data['output'] === '') {
      // If the response has no error or output, retry the test after 1 second
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post(COMPILER_API_URL, data)
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
    throw error;
  }
}

function updateSolution(solution, testsTotals, compilationError) {
  const passedTests = testsTotals.passedTests;
  const totalTests = testsTotals.totalTests;
  const newScore = calculateScore(passedTests, totalTests);
  if (compilationError !== null) {
    solution.status = 'Compilation Error';
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
  sendSolutionToJaagravCodexAPI,
  updateProfile,
  updateSolution,
};

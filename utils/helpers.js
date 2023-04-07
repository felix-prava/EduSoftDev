function checkQuizAnswers(userAnswers = [], rightAnswers = []) {
  if (userAnswers.length !== rightAnswers.length) {
    return -1;
  }
  for (const answer of rightAnswers) {
    if (!userAnswers.includes(answer._id.toHexString())) return -1;
  }
  return 0;
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

function failedQuizzesContainsCurrentQuiz(failedQuizzes, quizId) {
  for (const failedQuiz of failedQuizzes) {
    if (quizId === failedQuiz.quiz.toHexString()) return true;
  }
  return false;
}

function calculateScore(passedTests, totalTests) {
  const percentage = (passedTests / totalTests) * 100;
  return parseFloat(percentage.toFixed(2)); // limit to 2 decimal places
}

function updateSolution(solution, newScore, compilationError) {
  if (compilationError !== null) {
    solution.status = compilationError;
  } else {
    solution.score = newScore;
    solution.status = newScore === 100 ? 'accepted' : 'incorrect';
  }
}

module.exports = {
  filterFailedQuizzes,
  checkQuizAnswers,
  failedQuizzesContainsCurrentQuiz,
  calculateScore,
  updateSolution,
};

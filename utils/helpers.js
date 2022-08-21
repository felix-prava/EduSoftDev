function filterFailedQuizzes(failedQuizzes) {
  return failedQuizzes.filter(
    (quiz) =>
      !(
        new Date(
          quiz.failedQuizDate.getTime() + 1000 * 60 * quiz.waitingMinutes
        ) < Date.now()
      )
  );
}

function failedQuizzesContainsCurrentQuiz(failedQuizzes, quizId) {
  for (const failedQuiz of failedQuizzes) {
    if (quizId === failedQuiz.quiz.toHexString()) return true;
  }
  return false;
}

module.exports = {
  filterFailedQuizzes,
  failedQuizzesContainsCurrentQuiz,
};

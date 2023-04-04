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

module.exports = {
  filterFailedQuizzes,
  checkQuizAnswers,
  failedQuizzesContainsCurrentQuiz,
};

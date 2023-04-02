const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const checkRole = require('../../../middleware/checkRole');
const { check, validationResult } = require('express-validator');
const {
  filterFailedQuizzes,
  failedQuizzesContainsCurrentQuiz,
  checkQuizAnswers,
} = require('../../../utils/helpers');

const LearningMaterial = require('../../../models/LearningMaterial');

// @route   PUT /api/learning-materials/quizzes/:quiz_id
// @desc    Update a quiz
// @access  Private
router.put(
  '/:quiz_id',
  [
    auth,
    checkRole('mentor'),
    check('name', 'Name is required').not().isEmpty(),
    check('module', 'Module is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience must be a positive number').isFloat({
      gt: 0,
    }),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a positive number').isFloat({
      gt: 0,
    }),
    check('body', 'Body is required').not().isEmpty(),
    check('shortDescription', 'Short description is required').not().isEmpty(),
    check('rightAnswers', 'You must add at least one right answer')
      .not()
      .isEmpty(),
    check(
      'waitingMinutes',
      'The number of minutes a user must wait before retaking the quiz is required'
    )
      .not()
      .isEmpty(),
    check(
      'waitingMinutes',
      'The number of minutes a user must wait before retaking the quiz must be a positive integer'
    ).isInt({ gt: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      module,
      expNeeded,
      expGained,
      expMax,
      body,
      shortDescription,
      waitingMinutes,
      failedQuizMessage,
      wrongAnswers,
      rightAnswers,
    } = req.body;

    try {
      const quiz = await LearningMaterial.findById(req.params.quiz_id);
      if (!quiz || quiz.type !== 'Quiz') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }

      // Update quiz
      const updatedQuiz = await LearningMaterial.findOneAndUpdate(
        { _id: quiz.id },
        {
          $set: {
            name,
            module,
            expNeeded,
            expGained,
            expMax,
            body,
            shortDescription,
            waitingMinutes,
            failedQuizMessage,
            wrongAnswers,
            rightAnswers,
          },
        },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedQuiz);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST /api/learning-materials/quizzes/:quiz_id/quiz-solved
// @desc    Complete a quiz
// @access  Private
router.post('/:quiz_id/quiz-solved', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ error: [{ msg: 'User does not exists' }] });
    }
    const quiz = await LearningMaterial.findById(req.params.quiz_id);
    if (!quiz || quiz.type !== 'Quiz') {
      return res.status(404).json({ msg: 'Quiz not found' });
    }

    // Check if user must wait before responding again to the quiz
    failedQuizzesCount = user.failedQuizzes.length;
    if (failedQuizzesCount > 0) {
      filteredQuizzes = filterFailedQuizzes(user.failedQuizzes);
      if (filteredQuizzes.length !== failedQuizzesCount) {
        user.failedQuizzes = filteredQuizzes;
      }
      if (
        failedQuizzesContainsCurrentQuiz(
          user.failedQuizzes,
          quiz._id.toHexString()
        )
      ) {
        await user.save();
        return res.status(400).json({
          errors: [
            {
              msg: `You must wait ${quiz.waitingMinutes} minutes before being able to retake the quiz`,
            },
          ],
        });
      }
    }

    // Check if the user has responded correctly
    const checkStatus = checkQuizAnswers(req.body, quiz.rightAnswers);
    if (checkStatus !== 0) {
      user.failedQuizzes.push({
        quiz: req.params.quiz_id,
        waitingMinutes: quiz.waitingMinutes,
      });
      const failedQuizMessage =
        req.body.length == 1 ? 'Wrong answer' : 'Wrong answers';
      await user.save();
      return res.status(400).json({
        errors: [{ msg: quiz.failedQuizMessage || failedQuizMessage }],
      });
    }

    // Check if the user has already solved the quiz
    if (
      !(
        user.solvedQuizzes.filter(
          (quiz_solved) => quiz_solved.quiz.toString() === req.params.quiz_id
        ).length > 0
      )
    ) {
      user.solvedQuizzes.unshift({ quiz: req.params.quiz_id });
      const maxExp = quiz.expMax;
      const gainedExp = user.exp + quiz.expGained;
      user.exp = gainedExp > maxExp ? maxExp : gainedExp;
    }

    // Check if the quiz has already been solved by the user
    if (
      !(
        quiz.solvingUsers.filter(
          (solving_user) => solving_user.toString() === req.user.id
        ).length > 0
      )
    ) {
      quiz.solvingUsers.unshift(req.user.id);
    }

    await user.save();
    await quiz.save();

    res.json({
      solvedQuizzes: user.solvedQuizzes,
      solvingUsers: quiz.solvingUsers,
    });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/learning-materials/quizzes/:quiz_id/:answer_type
// @desc    Add an answer to a quiz
// @access  Private
router.post(
  '/:quiz_id/:answer_type',
  [
    auth,
    checkRole('mentor'),
    check('body', 'Body is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const quiz = await LearningMaterial.findById(req.params.quiz_id);
      if (!quiz || quiz.type !== 'Quiz') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }

      const answerType = req.params.answer_type;
      let answers = quiz.wrongAnswers;
      if (answerType === 'rightAnswer') {
        answers = quiz.rightAnswers;
      }

      const newAnswer = {
        body: req.body.body,
      };
      answers.push(newAnswer);

      await quiz.save();

      res.json(answers);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/learning-materials/quizzes/:quiz_id/:answer_type/:answer_id
// @desc    Delete an answer from a quiz
// @access  Private
router.delete(
  '/:quiz_id/:answer_type/:answer_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const quiz = await LearningMaterial.findById(req.params.quiz_id);
      if (!quiz || quiz.type !== 'Quiz') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }

      const answerType = req.params.answer_type;
      let answers = quiz.wrongAnswers;
      if (answerType === 'rightAnswers') {
        answers = quiz.rightAnswers;
      }

      // Pull out answer
      const answer = answers.find(
        (answer) => answer.id === req.params.answer_id
      );
      if (!answer) {
        return res.status(404).json({ msg: 'Answer does not exist' });
      }

      const removeIndex = answers
        .map((answer) => answer.id.toString())
        .indexOf(req.params.answer_id);

      answers.splice(removeIndex, 1);
      await quiz.save();

      res.json({ msg: 'Answer deleted' });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Quiz not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

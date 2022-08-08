const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const checkRole = require('../../../middleware/checkRole');
const { check, validationResult } = require('express-validator');

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
    check('failedQuizMessage', 'A message for a failed quiz is required')
      .not()
      .isEmpty(),
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
      if (!quiz) {
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
      if (!quiz) {
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
      if (!quiz) {
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

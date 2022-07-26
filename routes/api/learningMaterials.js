const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const compareUsers = require('../../middleware/compareUsers');
const { check, validationResult } = require('express-validator');

const LearningMaterial = require('../../models/LearningMaterial');

// @route   GET /api/learning-materials/:module_name
// @desc    Get problems, lessons and quizzes by module name
// @access  Private
router.get('/:module_name', async (req, res) => {
  try {
    const learningMaterials = await LearningMaterial.find({
      module: req.params.module_name,
    }).sort({ expNeeded: 1 });
    res.json(learningMaterials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/learning-materials/add-problem
// @desc    Create a problem
// @access  Private
router.post(
  '/add-problem',
  [
    auth,
    checkRole('mentor'),
    check('name', 'Name is required').not().isEmpty(),
    check('module', 'Module is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience must be a number').isFloat(),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a number').isFloat(),
    check('body', 'Body is required').not().isEmpty(),
    check('shortDescription', 'Short description is required').not().isEmpty(),
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
      tests,
      examples,
      hints,
    } = req.body;

    try {
      problem = new LearningMaterial({
        name,
        type: 'Problem',
        module,
        expNeeded,
        expGained,
        expMax,
        body,
        shortDescription,
        tests,
        examples,
        hints,
      });

      await problem.save();

      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   POST /api/learning-materials/add-lesson
// @desc    Create a lesson
// @access  Private
router.post(
  '/add-lesson',
  [
    auth,
    checkRole('mentor'),
    check('name', 'Name is required').not().isEmpty(),
    check('module', 'Module is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience must be a number').isFloat(),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a number').isFloat(),
    check('body', 'Body is required').not().isEmpty(),
    check('shortDescription', 'Short description is required').not().isEmpty(),
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
    } = req.body;

    try {
      lesson = new LearningMaterial({
        name,
        type: 'Lesson',
        module,
        expNeeded,
        expGained,
        expMax,
        body,
        shortDescription,
      });

      await lesson.save();

      res.json(lesson);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   POST /api/learning-materials/add-quiz
// @desc    Create a quiz
// @access  Private
router.post(
  '/add-quiz',
  [
    auth,
    checkRole('mentor'),
    check('name', 'Name is required').not().isEmpty(),
    check('module', 'Module is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience must be a number').isFloat(),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a number').isFloat(),
    check('body', 'Body is required').not().isEmpty(),
    check('shortDescription', 'Short description is required').not().isEmpty(),
    check('rightAnswers', 'You must add at least one right answer!!')
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
      wrongAnswers,
      rightAnswers,
    } = req.body;

    try {
      quiz = new LearningMaterial({
        name,
        type: 'Quiz',
        module,
        expNeeded,
        expGained,
        expMax,
        body,
        shortDescription,
        wrongAnswers,
        rightAnswers,
      });

      await quiz.save();

      res.json(quiz);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

module.exports = router;

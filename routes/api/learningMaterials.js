const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const compareUsers = require('../../middleware/compareUsers');
const { check, validationResult } = require('express-validator');

const LearningMaterial = require('../../models/LearningMaterial');

// @route   GET /api/learning-materials/modules/:module_name
// @desc    Get problems, lessons and quizzes by module name
// @access  Private
router.get('/modules/:module_name', auth, async (req, res) => {
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

// @route   GET /api/learning-materials/:learning_material_id
// @desc    Get problem, lesson or a quizz by id
// @access  Private
router.get('/:learning_material_id', auth, async (req, res) => {
  try {
    const learningMaterial = await LearningMaterial.findById(
      req.params.learning_material_id
    );
    if (!learningMaterial) {
      return res.status(404).json({ msg: 'Learning material not found' });
    }
    res.json(learningMaterial);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Learning material not found' });
    }
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
    check('expNeeded', 'Minimum experience must be a positive number').isFloat({
      gt: 0,
    }),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a positive number').isFloat({
      gt: 0,
    }),
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
    check('expNeeded', 'Minimum experience must be a positive number').isFloat({
      gt: 0,
    }),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a positive number').isFloat({
      gt: 0,
    }),
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
      quiz = new LearningMaterial({
        name,
        type: 'Quiz',
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
      });

      await quiz.save();

      res.json(quiz);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   PUT /api/learning-materials/problems/:problem_id
// @desc    Update a problem
// @access  Private
router.put(
  '/problems/:problem_id',
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
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found' });
      }

      // Update problem
      const updatedProblem = await LearningMaterial.findOneAndUpdate(
        { _id: problem.id },
        {
          $set: {
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
          },
        },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedProblem);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/learning-materials/lessons/:lesson_id
// @desc    Update a lesson
// @access  Private
router.put(
  '/lessons/:lesson_id',
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
      const lesson = await LearningMaterial.findById(req.params.lesson_id);
      if (!lesson) {
        return res.status(404).json({ msg: 'Lesson not found' });
      }

      // Update lesson
      const updatedLesson = await LearningMaterial.findOneAndUpdate(
        { _id: lesson.id },
        {
          $set: {
            name,
            module,
            expNeeded,
            expGained,
            expMax,
            body,
            shortDescription,
          },
        },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedLesson);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Lesson not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/learning-materials/quizzes/:quiz_id
// @desc    Update a quiz
// @access  Private
router.put(
  '/quizzes/:quiz_id',
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

// @route   DELETE /api/learning-materials/:learning_material_id
// @desc    Delete a learning material
// @access  Private
router.delete(
  '/:learning_material_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const learningMaterial = await LearningMaterial.findById(
        req.params.learning_material_id
      );
      if (!learningMaterial) {
        return res.status(404).json({ msg: 'Learning material not found' });
      }
      await learningMaterial.remove();
      // TODO update next and prev
      res.json({ msg: 'Learning material deleted' });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Learning material not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST /api/learning-materials/problems/:problem_id/hints
// @desc    Add a hint to a problem
// @access  Private
router.post(
  '/problems/:problem_id/hints',
  [
    auth,
    checkRole('mentor'),
    check('body', 'Body is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found' });
      }

      const newAnswer = {
        body: req.body.body,
      };
      problem.hints.push(newAnswer);

      await problem.save();

      res.json(problem.hints);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
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
  '/quizzes/:quiz_id/:answer_type',
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

// @route   DELETE /api/learning-materials/problems/:problem_id/hints/:hint_id
// @desc    Delete a hint from a problem
// @access  Private
router.delete(
  '/problems/:problem_id/hints/:hint_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      let hints = problem.hints;

      // Pull out hint
      const hint = hints.find((hint) => hint.id === req.params.hint_id);
      if (!hint) {
        return res.status(404).json({ msg: 'Hint does not exist' });
      }

      const removeIndex = hints
        .map((hint) => hint.id.toString())
        .indexOf(req.params.hint_id);

      hints.splice(removeIndex, 1);
      await problem.save();

      res.json({ msg: 'Hint deleted' });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
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
  '/quizzes/:quiz_id/:answer_type/:answer_id',
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

const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const bearerAuth = require('../../../middleware/bearerAuth');
const checkRole = require('../../../middleware/checkRole');
const { check, validationResult } = require('express-validator');

const LearningMaterial = require('../../../models/LearningMaterial');

// @route   PUT /api/learning-materials/problems/:problem_id
// @desc    Update a problem
// @access  Private
router.put(
  '/:problem_id',
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
    check('expMax')
      .optional()
      .custom((value, { req }) => {
        if (value === '') {
          return true;
        }
        if (
          isNaN(value) ||
          (value && req.body.expNeeded && value <= req.body.expNeeded)
        ) {
          throw new Error(
            'Maximum experience must be greater than experience needed'
          );
        }
        return true;
      }),
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
      if (!problem || problem.type !== 'Problem') {
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

// @route   POST /api/learning-materials/problems/:problem_id/hints
// @desc    Add a hint to a problem
// @access  Private
router.post(
  '/:problem_id/hints',
  [
    auth,
    checkRole('mentor'),
    check('body', 'Body is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem || problem.type !== 'Problem') {
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

// @route   POST /api/learning-materials/problems/:problem_id/:user_id/problem-solved
// @desc    Complete a problem
// @access  Private
router.post(
  '/:problem_id/:user_id/problem-solved',
  bearerAuth,
  async (req, res) => {
    try {
      user_id = req.params.user_id;
      const user = await User.findById(user_id).select('-password');

      if (!user) {
        return res
          .status(400)
          .json({ error: [{ msg: 'User does not exists' }] });
      }
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem || problem.type !== 'Problem') {
        return res.status(404).json({ msg: 'Problem not found' });
      }

      // Check if the user has already solved the problem
      if (
        !(
          user.solvedProblems.filter(
            (solved_problem) =>
              solved_problem.problem.toString() === req.params.problem_id
          ).length > 0
        )
      ) {
        user.solvedProblems.unshift({
          problem: req.params.problem_id,
          name: problem.name,
          module: problem.module,
        });
        const maxExp = problem.expMax;
        const gainedExp = user.exp + problem.expGained;
        user.exp = gainedExp > maxExp ? maxExp : gainedExp;
      }

      // Check if the problem has already been solved by the user
      if (
        !(
          problem.solvingUsers.filter(
            (solving_user) => solving_user.toString() === user_id
          ).length > 0
        )
      ) {
        problem.solvingUsers.unshift(user_id);
      }

      await user.save();
      await problem.save();

      res.json({
        solvedProblems: user.solvedProblems,
        solvingUsers: problem.solvingUsers,
      });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST /api/learning-materials/problems/:problem_id/:request_type
// @desc    Add a test or an example to a problem
// @access  Private
router.post(
  '/:problem_id/:request_type',
  [
    auth,
    checkRole('mentor'),
    check('input', 'An input is required').not().isEmpty(),
    check('output', 'An output is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found' });
      }

      const requestType = req.params.request_type;
      let dataArray = problem.examples;
      if (requestType === 'tests') {
        dataArray = problem.tests;
      }

      const newAnswer = {
        input: req.body.input,
        output: req.body.output,
      };
      if (requestType === 'tests') {
        newAnswer.showTest = req.body.showTest;
      }
      dataArray.push(newAnswer);

      await problem.save();

      res.json(dataArray);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/learning-materials/problems/:problem_id/tests/:test_id
// @desc    Delete a test from a problem
// @access  Private
router.delete(
  '/:problem_id/tests/:test_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem || problem.type !== 'Problem') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      let tests = problem.tests;

      // Pull out test
      const test = tests.find((test) => test.id === req.params.test_id);
      if (!test) {
        return res.status(404).json({ msg: 'Test does not exist' });
      }

      const removeIndex = tests
        .map((test) => test.id.toString())
        .indexOf(req.params.test_id);

      tests.splice(removeIndex, 1);
      await problem.save();

      res.json({ msg: 'Test deleted' });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/learning-materials/problems/:problem_id/examples/:example_id
// @desc    Delete an example from a problem
// @access  Private
router.delete(
  '/:problem_id/examples/:example_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem || problem.type !== 'Problem') {
        return res.status(404).json({ msg: 'Problem not found' });
      }
      let examples = problem.examples;

      // Pull out example
      const example = examples.find(
        (example) => example.id === req.params.example_id
      );
      if (!example) {
        return res.status(404).json({ msg: 'Example does not exist' });
      }

      const removeIndex = examples
        .map((example) => example.id.toString())
        .indexOf(req.params.example_id);

      examples.splice(removeIndex, 1);
      await problem.save();

      res.json({ msg: 'Example deleted' });
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Problem not found' });
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
  '/:problem_id/hints/:hint_id',
  [auth, checkRole('mentor')],
  async (req, res) => {
    try {
      const problem = await LearningMaterial.findById(req.params.problem_id);
      if (!problem || problem.type !== 'Problem') {
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

module.exports = router;

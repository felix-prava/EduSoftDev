const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const http = require('http');
const axios = require('axios');
const {
  sendSolutionToJaagravCodexAPI,
  updateSolution,
} = require('../../utils/helpers');
const config = require('config');

const LearningMaterial = require('../../models/LearningMaterial');
const Solution = require('../../models/Solution');

// @route   POST /api/solutions/:problem_id/add-solution
// @desc    Add a solution to a problem
// @access  Private
router.post(
  '/:problem_id/add-solution',
  [auth, check('code', 'Body is required').not().isEmpty()],
  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ error: [{ msg: 'User does not exists' }] });
    }
    const problem = await LearningMaterial.findById(req.params.problem_id);
    if (!problem || problem.type !== 'Problem') {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    try {
      solution = new Solution({
        user: req.user.id,
        problem: problem._id,
        code: req.body.code,
      });

      await solution.save();

      // Start compilation and execution of the solution
      http.get(
        `${req.protocol}://${req.get('host')}/api/solutions/execute/${
          solution._id
        }`
      );
      res.json(solution);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   GET /api/solutions/users/:user_id
// @desc    Get a user's solutions
// @access  Private
router.get('/users/:user_id', auth, async (req, res) => {
  try {
    const solutions = await Solution.find({
      user: req.params.user_id,
    })
      .populate('problem', ['name', 'module'])
      .sort({ date: -1 })
      .limit(100);
    res.json(solutions);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'No solutions found for this user_id' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/solutions/execute/:solution_id
// @desc    Compile and execute a user's solution
// @access  Public
router.get('/execute/:solution_id', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solution_id).populate(
      'problem',
      'tests'
    );
    if (solution === null) {
      return res.status(404).json({ msg: 'Solution not found' });
    }
    let passedTests = 0;
    let totalTests = solution.problem.tests.length;
    let compilationError = null;

    for (const test of solution.problem.tests) {
      let responseCompilerAPI = await sendSolutionToJaagravCodexAPI(
        solution,
        test
      );
      compilationError = responseCompilerAPI['compilationError'];
      if (responseCompilerAPI['passedTest'] === true) {
        passedTests++;
      }
    }

    // Update solution
    const testsTotals = { passedTests, totalTests };
    updateSolution(solution, testsTotals, compilationError);

    const privateRouteKey =
      process.env.privateRouteKey || config.get('privateRouteKey');
    if (solution.status === 'accepted') {
      axios
        .post(
          `${req.protocol}://${req.get(
            'host'
          )}/api/learning-materials/problems/${solution.problem._id}/${
            solution.user._id
          }/problem-solved`,
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
    await solution.save();

    res.status(200).json('OK');
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Solution not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/solutions/:solution_id
// @desc    Get a solution by id
// @access  Private
router.get('/:solution_id', auth, async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solution_id).populate(
      'problem',
      ['name', 'module']
    );
    res.json(solution);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(404)
        .json({ msg: 'No solution found for this solution_id' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

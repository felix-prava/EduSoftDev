const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const http = require('http');
const axios = require('axios');
const { updateSolution } = require('../../utils/helpers');
const COMPILER_API_URL = 'https://api.codex.jaagrav.in';
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
        `${req.protocol}://${req.hostname}:3200/api/solutions/execute/${solution._id}`
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
              passedTests++;
            }
          }
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    // Update solution
    const testsTotals = { passedTests, totalTests };
    updateSolution(solution, testsTotals, compilationError);
    if (solution.status === 'accepted') {
      axios
        .post(
          `${req.protocol}://${req.hostname}:3200/api/learning-materials/problems/${solution.problem._id}/${solution.user._id}/problem-solved`,
          {},
          {
            headers: {
              Authorization: `Bearer ${config.get('privateRouteKey')}`,
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

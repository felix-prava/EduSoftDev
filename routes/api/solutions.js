const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const http = require('http');
const axios = require('axios');
const { calculateScore, updateSolution } = require('../../utils/helpers');
const COMPILER_API_URL = 'https://api.codex.jaagrav.in';

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
      http.get(`http://localhost:3200/api/solutions/execute/${solution._id}`); // TODO Update URL
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

    const promises = solution.problem.tests.map((test) => {
      const data = {
        code: solution.code,
        language: 'cpp',
        input: test.input,
      };

      return axios
        .post(COMPILER_API_URL, data)
        .then((response) => {
          if (response.data['error'] === '' && response.data['output'] === '') {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .post(COMPILER_API_URL, data)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              }, 1000); // Wait for 1 second before retrying the test
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
          return response;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    });

    Promise.all(promises)
      .then((_) => {
        // Update solution
        let newScore = calculateScore(passedTests, totalTests);
        updateSolution(solution, newScore, compilationError);
        solution.save();
      })
      .catch((error) => {
        console.error(error);
      });

    res.status(200).json('OK');
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Solution not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

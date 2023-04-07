const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

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

      res.json(solution);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   GET /api/solutions/users/:user_id
// @desc    Get a user's solutions
// @access  Private
router.get('/users/:user_id', async (req, res) => {
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

module.exports = router;

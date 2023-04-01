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
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);

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

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const compareUsers = require('../../middleware/compareUsers');
const { check, validationResult } = require('express-validator');

const LearningMaterial = require('../../models/LearningMaterial');

// @route   POST /api/learning-materials/add-problem
// @desc    Create a problem
// @access  Private
router.post(
  '/add-problem',
  [auth, checkRole('admin'), check('body', 'Body is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body, module, expNeeded, expGained } = req.body;

    try {
      problem = new LearningMaterial({
        body,
        module,
        expNeeded,
        expGained,
      });

      await problem.save();

      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   GET /api/learning-materials/:module_name
// @desc    Get problems, lessons and quizzes by module name
// @access  Private
router.get('/:module_name', async (req, res) => {
  try {
    const learningMaterials = await LearningMaterial.find({
      module: req.params.module_name,
    }).sort({ date: -1 });
    res.json(learningMaterials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

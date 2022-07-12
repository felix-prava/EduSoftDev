const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const compareUsers = require('../../middleware/compareUsers');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const LearningMaterial = require('../../models/LearningMaterial');

// @route   POST /api/learning-materials/add-problem
// @desc    Create a problem
// @access  Public
router.post(
  '/add-problem',
  [auth, checkRole('admin'), check('body', 'Body is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { body } = req.body;

    try {
      problem = new LearningMaterial({
        body,
      });

      await problem.save();

      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

module.exports = router;

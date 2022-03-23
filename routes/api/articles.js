const express = require('express');
const router = express.Router();

// @route   GET /api/articles
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Articles route'));

module.exports = router;

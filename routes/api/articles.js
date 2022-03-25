const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const compareUsers = require('../../middleware/compareUsers');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Article = require('../../models/Article');

// @route   POST /api/articles
// @desc    Create an article
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('subject', 'Subject is required').not().isEmpty(),
      check('body', 'Body is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newArticle = new Article({
        subject: req.body.subject,
        body: req.body.body,
        avatar: user.avatar,
        user: req.user.id,
      });
      const article = await newArticle.save();

      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/articles/:article_id
// @desc    Update an article
// @access  Private
router.put(
  '/:article_id',
  [
    auth,
    [
      check('subject', 'Subject is required').not().isEmpty(),
      check('body', 'Body is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subject, body } = req.body;

    try {
      const article = await Article.findById(req.params.article_id);
      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      const checkStatus = await compareUsers(
        req.user.id,
        article.user.toString(),
        'mentor'
      );
      if (checkStatus == 401 || checkStatus == 500)
        return res
          .status(checkStatus)
          .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

      // Update article
      const updatedArticle = await Article.findOneAndUpdate(
        { _id: article.id },
        { $set: { subject, body } },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedArticle);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/articles
// @desc    Get all articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/articles/:article_id
// @desc    Get article by id
// @access  Public
router.get('/:article_id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/articles/:article_id
// @desc    Delete an article
// @access  Private
router.delete('/:article_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    const checkStatus = await compareUsers(
      req.user.id,
      article.user.toString(),
      'mentor'
    );
    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    await article.remove();

    res.json({ msg: 'Article deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

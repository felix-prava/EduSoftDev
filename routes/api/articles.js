const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const compareUsers = require('../../middleware/compareUsers');

const User = require('../../models/User');
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
        userFirstName: user.firstName,
        userLastName: user.lastName,
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

// @route   PUT /api/articles/like/:article_id
// @desc    Like an article
// @access  Private
router.put('/like/:article_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    // Check if the article has already been liked
    if (
      article.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      const removeLikeIndex = article.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      article.likes.splice(removeLikeIndex, 1);
    } else {
      // Check if the article has already been disliked
      if (
        article.dislikes.filter(
          (dislike) => dislike.user.toString() === req.user.id
        ).length > 0
      ) {
        const removeDislikeIndex = article.dislikes
          .map((dislike) => dislike.user.toString())
          .indexOf(req.user.id);
        article.dislikes.splice(removeDislikeIndex, 1);
      }

      article.likes.unshift({ user: req.user.id });
    }

    await article.save();
    res.json({ likes: article.likes, dislikes: article.dislikes });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/articles/dislike/:article_id
// @desc    Dislike an article
// @access  Private
router.put('/dislike/:article_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);

    // Check if the article has already been disliked
    if (
      article.dislikes.filter(
        (dislike) => dislike.user.toString() === req.user.id
      ).length > 0
    ) {
      const removeDislikeIndex = article.dislikes
        .map((dislike) => dislike.user.toString())
        .indexOf(req.user.id);
      article.dislikes.splice(removeDislikeIndex, 1);
    } else {
      // Check if the article has already been liked
      if (
        article.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        const removeLikeIndex = article.likes
          .map((like) => like.user.toString())
          .indexOf(req.user.id);
        article.likes.splice(removeLikeIndex, 1);
      }

      article.dislikes.unshift({ user: req.user.id });
    }

    await article.save();
    res.json({ likes: article.likes, dislikes: article.dislikes });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/articles/comment/:article_id
// @desc    Comment on an article
// @access  Private
router.post(
  '/comment/:article_id',
  [auth, [check('body', 'Body is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const article = await Article.findById(req.params.article_id);

      const newComment = {
        body: req.body.body,
        avatar: user.avatar,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        user: req.user.id,
      };
      article.comments.unshift(newComment);

      await article.save();

      res.json(article.comments);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Article not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/articles/comment/:article_id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:article_id/:comment_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    // Pull out comment
    const comment = article.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    const checkStatus = await compareUsers(
      req.user.id,
      comment.user.toString(),
      'mentor'
    );

    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const removeIndex = article.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    article.comments.splice(removeIndex, 1);
    await article.save();

    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/articles/comment/:article_id/:comment_id
// @desc    Update a comment
// @access  Private
router.put(
  '/comment/:article_id/:comment_id',
  [auth, [check('body', 'Body is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { body } = req.body;

    try {
      const article = await Article.findById(req.params.article_id);
      if (!article) {
        return res.status(404).json({ msg: 'Article not found' });
      }

      // Pull out comment
      const comment = article.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }

      const checkStatus = await compareUsers(
        req.user.id,
        comment.user.toString(),
        'mentor'
      );
      if (checkStatus == 401 || checkStatus == 500)
        return res
          .status(checkStatus)
          .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

      // Update comment
      let comments = article.comments;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i] === comment) {
          comment.body = body;
        }
      }

      const updatedArticle = await Article.findOneAndUpdate(
        { _id: article.id },
        { $set: { comments } },
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

// TODO like and dislike for comments

module.exports = router;

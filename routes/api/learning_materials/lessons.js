const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const checkRole = require('../../../middleware/checkRole');
const { check, validationResult } = require('express-validator');

const LearningMaterial = require('../../../models/LearningMaterial');

// @route   PUT /api/learning-materials/lessons/:lesson_id
// @desc    Update a lesson
// @access  Private
router.put(
  '/:lesson_id',
  [
    auth,
    checkRole('mentor'),
    check('name', 'Name is required').not().isEmpty(),
    check('module', 'Module is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience is required').not().isEmpty(),
    check('expNeeded', 'Minimum experience must be a positive number').isFloat({
      gt: 0,
    }),
    check('expGained', 'Experience gained is required').not().isEmpty(),
    check('expGained', 'Experience gained must be a positive number').isFloat({
      gt: 0,
    }),
    check('body', 'Body is required').not().isEmpty(),
    check('shortDescription', 'Short description is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      module,
      expNeeded,
      expGained,
      expMax,
      body,
      shortDescription,
    } = req.body;

    try {
      const lesson = await LearningMaterial.findById(req.params.lesson_id);
      if (!lesson) {
        return res.status(404).json({ msg: 'Lesson not found' });
      }

      // Update lesson
      const updatedLesson = await LearningMaterial.findOneAndUpdate(
        { _id: lesson.id },
        {
          $set: {
            name,
            module,
            expNeeded,
            expGained,
            expMax,
            body,
            shortDescription,
          },
        },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedLesson);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'Lesson not found' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

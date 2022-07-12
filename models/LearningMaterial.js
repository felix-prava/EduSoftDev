const mongoose = require('mongoose');

const LearningMaterialSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'problem',
  },
  body: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  dislikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      body: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = LearningMaterial = mongoose.model(
  'learning_material',
  LearningMaterialSchema
);

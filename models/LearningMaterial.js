const mongoose = require('mongoose');

const LearningMaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'problem', // other options: lesson, quiz
  },
  module: {
    type: String,
    required: true,
  },
  expNeeded: {
    type: Number,
    required: true,
  },
  expGained: {
    type: Number,
    required: true,
  },
  expMax: {
    type: Number,
  },
  body: {
    type: String,
    required: true,
  },
  tests: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
  examples: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
  hints: [
    {
      body: {
        type: String,
      },
    },
  ],
  wrongAnswers: [
    {
      body: {
        type: String,
      },
    },
  ],
  rightAnswers: [
    {
      body: {
        type: String,
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
  previous: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'learning_materials',
  },
  next: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'learning_materials',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = LearningMaterial = mongoose.model(
  'learning_material',
  LearningMaterialSchema
);

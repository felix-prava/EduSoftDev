const mongoose = require('mongoose');

const LearningMaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Problem', // other options: Lesson, Quiz
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
  shortDescription: {
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
      showTest: {
        type: Boolean,
        default: true,
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
  waitingMinutes: {
    type: Number,
  },
  failedQuizMessage: {
    type: String,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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
  solvingUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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

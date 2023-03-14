const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: 'normal',
  },
  exp: {
    type: Number,
    default: 1,
  },
  solvedProblems: [
    {
      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
    },
  ],
  lessonsLearned: [
    {
      lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
    },
  ],
  solvedQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
    },
  ],
  failedQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
      failedQuizDate: {
        type: Date,
        default: Date.now,
      },
      waitingMinutes: {
        type: Number,
      },
    },
  ],
  lastLearningMaterial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'learning_material',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);

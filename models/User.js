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
  language: {
    type: String,
    default: 'en',
  },
  birthdate: {
    type: Date,
  },
  getNotifications: {
    type: Boolean,
    default: false,
  },
  getNews: {
    type: Boolean,
    default: false,
  },
  solvedProblems: [
    {
      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
      name: {
        type: String,
      },
      module: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lessonsLearned: [
    {
      lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
      name: {
        type: String,
      },
      module: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  solvedQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
      name: {
        type: String,
      },
      module: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  failedQuizzes: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learning_material',
      },
      date: {
        type: Date,
        default: Date.now,
      },
      waitingMinutes: {
        type: Number,
      },
    },
  ],
  lastLearningMaterial: {
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'learning_material',
    },
    module: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);

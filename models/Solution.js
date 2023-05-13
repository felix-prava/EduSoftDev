const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'learning_material',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
  totalTests: {
    type: Number,
    default: 0,
  },
  passedTests: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Solution = mongoose.model('solution', SolutionSchema);

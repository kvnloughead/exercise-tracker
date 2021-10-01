const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  logs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    default: [],
  }]
});

module.exports = mongoose.model('User', userSchema);
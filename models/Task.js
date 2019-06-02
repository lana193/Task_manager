const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: String
  },
  shareid: {
    type: String
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);
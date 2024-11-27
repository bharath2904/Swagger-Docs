const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, 
  },
  description: {  
    type: String,
    required: false, 
  },
  completed: {
    type: Boolean,
    default: false, 
  }
});

module.exports = mongoose.model('Task', taskSchema);

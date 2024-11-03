const mongoose = require('mongoose');

const ProgressEntrySchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  progress: { type: Number, required: true } 
});

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progressLog: [ProgressEntrySchema],
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, 
  streak: { type: Number, default: 0 }
});

module.exports = mongoose.model('Habit', HabitSchema);
import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  currentDay: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastCheckIn: {
    type: Date,
    default: null
  },
  checkInHistory: [{
    date: Date,
    timestamp: Date
  }]
}, {
  timestamps: true
});

export default mongoose.model('Habit', habitSchema);


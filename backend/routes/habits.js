import express from 'express';
import Habit from '../models/Habit.js';

const router = express.Router();

// Get a single habit
router.get('/single/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findByPk(id);
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new habit
router.post('/', async (req, res) => {
  try {
    const { userId, title, duration } = req.body;
    
    if (!userId || !title || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const habit = await Habit.create({ 
      userId, 
      title, 
      duration: parseInt(duration),
      currentDay: 0,
      completed: false,
      checkInHistory: []
    });
    
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all habits for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await Habit.findAll({ 
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update habit progress
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findByPk(id);

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Check if already checked in today
    const today = new Date();
    const lastCheckIn = habit.lastCheckIn;
    
    if (lastCheckIn) {
      const lastCheckInDate = new Date(lastCheckIn);
      const isSameDay = today.getDate() === lastCheckInDate.getDate() &&
                        today.getMonth() === lastCheckInDate.getMonth() &&
                        today.getFullYear() === lastCheckInDate.getFullYear();
      
      if (isSameDay) {
        return res.status(400).json({ error: 'Already checked in today' });
      }
    }

    // Update progress
    const newCurrentDay = habit.currentDay + 1;
    const checkInHistory = habit.checkInHistory || [];
    checkInHistory.push({
      date: today.toISOString(),
      timestamp: new Date().toISOString()
    });

    // Check if completed
    const completed = newCurrentDay >= habit.duration;

    await habit.update({
      currentDay: newCurrentDay,
      lastCheckIn: today,
      checkInHistory: checkInHistory,
      completed: completed
    });

    // Reload to get updated values
    await habit.reload();
    
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import express from 'express';
import Habit from '../models/Habit.js';
import { getDb } from '../config/sqlite.js';

const router = express.Router();

const useSqlite = (process.env.DB_DRIVER || '').toLowerCase() === 'sqlite';

// Get a single habit (place before parameterized user route to avoid conflicts)
router.get('/single/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (useSqlite) {
      const db = getDb();
      const row = db.prepare('SELECT * FROM habits WHERE id = ? OR uuid = ?').get(id, id);
      if (!row) return res.status(404).json({ error: 'Habit not found' });
      const habit = { ...row, completed: !!row.completed, checkInHistory: JSON.parse(row.checkInHistory || '[]') };
      return res.json(habit);
    }
    const habit = await Habit.findById(id);
    
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
    if (useSqlite) {
      const db = getDb();
      const stmt = db.prepare(`INSERT INTO habits (uuid, userId, title, duration, currentDay, checkInHistory) VALUES (hex(randomblob(16)), ?, ?, ?, 0, '[]')`);
      const info = stmt.run(userId, title, parseInt(duration));
      const row = db.prepare('SELECT * FROM habits WHERE id = ?').get(info.lastInsertRowid);
      const created = { ...row, completed: !!row.completed, checkInHistory: JSON.parse(row.checkInHistory || '[]') };
      return res.status(201).json(created);
    }

    const habit = new Habit({ userId, title, duration: parseInt(duration) });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all habits for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (useSqlite) {
      const db = getDb();
      const rows = db.prepare('SELECT * FROM habits WHERE userId = ? ORDER BY createdAt DESC').all(userId);
      const habits = rows.map(r => ({ ...r, completed: !!r.completed, checkInHistory: JSON.parse(r.checkInHistory || '[]') }));
      return res.json(habits);
    }
    const habits = await Habit.find({ userId }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update habit progress
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (useSqlite) {
      const db = getDb();
      const row = db.prepare('SELECT * FROM habits WHERE id = ? OR uuid = ?').get(id, id);
      if (!row) return res.status(404).json({ error: 'Habit not found' });

      const today = new Date();
      const lastCheckIn = row.lastCheckIn ? new Date(row.lastCheckIn) : null;
      if (lastCheckIn) {
        const isSameDay = today.getDate() === lastCheckIn.getDate() &&
                          today.getMonth() === lastCheckIn.getMonth() &&
                          today.getFullYear() === lastCheckIn.getFullYear();
        if (isSameDay) return res.status(400).json({ error: 'Already checked in today' });
      }

      const history = row.checkInHistory ? JSON.parse(row.checkInHistory) : [];
      history.push({ date: today.toISOString(), timestamp: new Date().toISOString() });
      const newCurrent = (row.currentDay || 0) + 1;
      const completed = newCurrent >= row.duration ? 1 : 0;
      db.prepare('UPDATE habits SET currentDay = ?, lastCheckIn = ?, checkInHistory = ?, completed = ?, updatedAt = datetime("now") WHERE id = ?')
        .run(newCurrent, today.toISOString(), JSON.stringify(history), completed, row.id);
      const updated = db.prepare('SELECT * FROM habits WHERE id = ?').get(row.id);
      return res.json({ ...updated, completed: !!updated.completed, checkInHistory: JSON.parse(updated.checkInHistory || '[]') });
    }
    const habit = await Habit.findById(id);

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
    habit.currentDay += 1;
    habit.lastCheckIn = today;
    habit.checkInHistory.push({
      date: today,
      timestamp: new Date()
    });

    // Check if completed
    if (habit.currentDay >= habit.duration) {
      habit.completed = true;
    }

    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// GET /api/activities — get 10 most recent activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/activities — log a new activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity({
      text: req.body.text,
      timestamp: req.body.timestamp || new Date().toISOString(),
    });
    const saved = await activity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

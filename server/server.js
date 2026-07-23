import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks.js';
import activityRoutes from './routes/activities.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);
app.use('/api/activities', activityRoutes);

// Health check
app.get('/', (_req, res) => {
  res.json({ status: 'TaskFlow API is running ✅', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ─── Connect to MongoDB Atlas & Start Server ─────────────────────────────────
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 API Server running on http://localhost:${PORT}`);
      console.log(`   Tasks:      http://localhost:${PORT}/api/tasks`);
      console.log(`   Activities: http://localhost:${PORT}/api/activities`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

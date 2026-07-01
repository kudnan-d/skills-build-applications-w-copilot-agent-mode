import express from 'express';
import { connectToDatabase } from '../database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find({}).sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
});

connectToDatabase()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });

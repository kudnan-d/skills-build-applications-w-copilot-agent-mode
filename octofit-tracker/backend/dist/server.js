"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const User_1 = require("./models/User");
const Team_1 = require("./models/Team");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 8000;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users', async (_req, res) => {
    const users = await User_1.User.find({});
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await Team_1.Team.find({});
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await Activity_1.Activity.find({});
    res.json(activities);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await Leaderboard_1.Leaderboard.find({}).sort({ rank: 1 });
    res.json(leaderboard);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await Workout_1.Workout.find({});
    res.json(workouts);
});
(0, database_1.connectToDatabase)()
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

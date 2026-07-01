"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Workout_1 = require("../models/Workout");
// Seed the octofit_db database with test data
async function seedDatabase() {
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        Leaderboard_1.Leaderboard.deleteMany({}),
        Workout_1.Workout.deleteMany({})
    ]);
    const users = await User_1.User.insertMany([
        { name: 'Ava Chen', email: 'ava@example.com', age: 29, fitnessGoal: 'Improve endurance' },
        { name: 'Liam Patel', email: 'liam@example.com', age: 34, fitnessGoal: 'Build strength' },
        { name: 'Mina Ortiz', email: 'mina@example.com', age: 27, fitnessGoal: 'Increase mobility' }
    ]);
    const team = await Team_1.Team.create({
        name: 'Peak Performers',
        sport: 'CrossFit',
        members: users.map((user) => user._id)
    });
    await User_1.User.updateMany({}, { teamId: team._id });
    await Activity_1.Activity.insertMany([
        { userId: users[0]._id, type: 'Run', durationMinutes: 35, caloriesBurned: 410, date: new Date('2026-06-20') },
        { userId: users[1]._id, type: 'Strength', durationMinutes: 50, caloriesBurned: 520, date: new Date('2026-06-21') },
        { userId: users[2]._id, type: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: new Date('2026-06-22') }
    ]);
    await Leaderboard_1.Leaderboard.insertMany([
        { userId: users[0]._id, score: 980, rank: 1 },
        { userId: users[1]._id, score: 945, rank: 2 },
        { userId: users[2]._id, score: 905, rank: 3 }
    ]);
    await Workout_1.Workout.insertMany([
        { name: 'HIIT Burner', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 25 },
        { name: 'Core Sculpt', focus: 'Abs', difficulty: 'Beginner', durationMinutes: 20 },
        { name: 'Power Circuit', focus: 'Full Body', difficulty: 'Advanced', durationMinutes: 40 }
    ]);
    console.log('Seed the octofit_db database with test data');
}
seedDatabase()
    .then(() => {
    console.log('Seeding completed');
    process.exit(0);
})
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

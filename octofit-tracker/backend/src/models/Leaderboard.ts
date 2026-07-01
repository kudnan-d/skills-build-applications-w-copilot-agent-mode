import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
}, { timestamps: true });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

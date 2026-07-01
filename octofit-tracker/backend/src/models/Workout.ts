import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true }
}, { timestamps: true });

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

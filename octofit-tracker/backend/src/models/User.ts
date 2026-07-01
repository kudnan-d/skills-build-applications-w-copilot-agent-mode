import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessGoal: string;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessGoal: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);

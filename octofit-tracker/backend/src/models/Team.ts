import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Team = mongoose.model<ITeam>('Team', teamSchema);

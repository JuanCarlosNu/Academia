import mongoose, {Schema, Document  } from 'mongoose';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'profesor' | 'alumno';
}

const UserSchema = new Schema<User & Document>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'profesor', 'alumno'], required: true }
});

export const UserModel = mongoose.model<IUser >('User', UserSchema);
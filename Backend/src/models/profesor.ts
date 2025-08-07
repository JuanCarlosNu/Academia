import mongoose from 'mongoose';
import { Schema, model, Document } from 'mongoose';

export interface IProfesor extends Document {
  nombre: string; 
  email: string;
  teléfono: string;
}

const ProfesorSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  teléfono: String,
});

export default mongoose.model<IProfesor>('Profesor', ProfesorSchema);

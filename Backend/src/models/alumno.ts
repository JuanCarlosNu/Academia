import mongoose, { Document } from 'mongoose';

export interface IAlumno extends Document {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  edad: number;
  clases_restantes: number;
  fecha_creacion: string;
}

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  email: String,
  edad: Number,
  clases_restantes: { type: Number, default: 0 },
  fecha_creacion: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
}, { timestamps: true });

export default mongoose.model<IAlumno>('Alumno', AlumnoSchema);
import mongoose from 'mongoose';
import { Schema, model, Document, Types } from 'mongoose';
import { IAlumno } from './alumno';
import { ICircuito } from './circuito';
import { IProfesor } from './profesor';

export interface IClase extends Document {
  fecha: string;
  hora: string;
  estado: string;
  alumno: Types.ObjectId | IAlumno;
  profesor?: Types.ObjectId | IProfesor;
  circuito?: Types.ObjectId | ICircuito;
}


const ClaseSchema = new mongoose.Schema({
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    required: false,
  },
  circuito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Circuito',
    required: false,
  },
  fecha: {
    type: String, // formato YYYY-MM-DD
    required: true,
  },
  hora: {
    type: String, // formato HH:mm
    required: true,
  },
  estado: {
    type: String,
    enum: ['reservada', 'completada', 'cancelada', 'pendiente'],
    default: 'reservada',
  },
  pago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pago',
  },
}, { timestamps: true });

export default model<IClase>('Clase', ClaseSchema);
import mongoose from 'mongoose';

const ClaseSchema = new mongoose.Schema({
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    required: true,
  },
  circuito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Circuito',
    required: true,
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
    enum: ['reservada', 'completada', 'cancelada'],
    default: 'reservada',
  },
  pago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pago',
  },
}, { timestamps: true });

export default mongoose.model('Clase', ClaseSchema);
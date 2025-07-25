import mongoose from 'mongoose';

const ClaseSchema = new mongoose.Schema({
  
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
    type: Date,
    required: true,
  },
  duracionMinutos: {
    type: Number,
    required: true,
  },
    
    alumno: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
  }],
}, { timestamps: true });

export default mongoose.model('Clase', ClaseSchema);
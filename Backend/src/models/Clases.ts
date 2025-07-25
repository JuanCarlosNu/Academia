import mongoose from 'mongoose';

const ClaseSchema = new mongoose.Schema({
  
  alumno: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
  }],
  
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
    
    
}, { timestamps: true });

export default mongoose.model('Clase', ClaseSchema);
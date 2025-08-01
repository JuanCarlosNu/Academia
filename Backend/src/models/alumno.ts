import mongoose from 'mongoose';

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  email: String,
  edad: Number,
  clases_restantes: {type: Number, default: 0 },
  fecha_creacion: {
    type: String, // formato YYYY-MM-DD
     default: () => new Date().toISOString().slice(0, 10),
  },
}, { timestamps: true });

export default mongoose.model('Alumno', AlumnoSchema);

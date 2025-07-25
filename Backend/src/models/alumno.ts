import mongoose from 'mongoose';

const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number,
});

export default mongoose.model('Alumno', AlumnoSchema);

import mongoose from 'mongoose';

const ProfesorSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  teléfono: String,
});

export default mongoose.model('Profesor', ProfesorSchema);

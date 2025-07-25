import mongoose from 'mongoose';

const CircuitoSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
});

export default mongoose.model('Circuito', CircuitoSchema);

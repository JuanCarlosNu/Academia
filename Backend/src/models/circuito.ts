import mongoose from 'mongoose';

export interface ICircuito extends Document {
  nombre: string;
  ubicacion: string;
 
};

const CircuitoSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
});

export default mongoose.model<ICircuito>('Circuito', CircuitoSchema);

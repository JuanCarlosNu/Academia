import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

export interface ICircuito extends Document {
  _id: Types.ObjectId;
  nombre: string;
  ubicacion: string;
 
};

const CircuitoSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
});

export default mongoose.model<ICircuito>('Circuito', CircuitoSchema);

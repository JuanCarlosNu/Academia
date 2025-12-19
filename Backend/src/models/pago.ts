import mongoose from 'mongoose';

export interface IPago extends mongoose.Document {
  fecha: Date; // YYYY-MM-DD
  monto: number; // Monto del pago
  metodo_pago: string; // Ej: 'efectivo', 'transferencia', 'mercadopago'
  alumno: mongoose.Types.ObjectId; // Referencia al alumno que realizó el pago
  cantidad_clases_pagadas: number; // Cantidad de clases pagadas en este pago
  estado: "activo" | "cancelado";

} 

const PagoSchema = new mongoose.Schema({
  fecha: {
    type: Date, // YYYY-MM-DD
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  metodo_pago: {
    type: String,
    enum: ['efectivo', 'transferencia', 'mercadopago'],
    required: true,
  },
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  cantidad_clases_pagadas: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['activo', 'cancelado'],
    default: 'activo',
  },
}, { timestamps: true });

export default mongoose.model<IPago>('Pago', PagoSchema);
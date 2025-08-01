import mongoose from 'mongoose';

const PagoSchema = new mongoose.Schema({
  fecha: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  metodo_pago: {
    type: String, // ej: 'efectivo', 'transferencia', 'mercadopago'
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
}, { timestamps: true });

export default mongoose.model('Pago', PagoSchema);
import { Request, Response } from "express";
import Pago from "../models/pago";

export const createPago = async (req: Request, res: Response) => {
  try {
    const { fecha, monto, metodo_pago, alumno, cantidad_clases_pagadas } = req.body;

    const nuevoPago = new Pago({
      fecha,
      monto,
      metodo_pago,
      alumno,
      cantidad_clases_pagadas,
    });

    await nuevoPago.save();

    return res.status(201).json({
      message: "Pago registrado correctamente",
      pago: nuevoPago,
    });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    return res.status(500).json({ error: "Error al registrar pago" });
  }
};
export const getPagosByAlumno = async (req: Request, res: Response) => {
    try {
        const {idAlumno} = req.params;
        const pagos = await Pago.find({ alumno: idAlumno }).sort({ fecha: -1 });
        return res.status(200).json(pagos);} 
        catch (error) {console.log("Error al obtener pagos:", error);
            return res.status(500).json({ error: "Error al obtener pagos" });
        }
};
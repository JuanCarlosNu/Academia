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
export const deletePago = async (req: Request, res: Response) => {
    try{
        const {idPago} = req.params;
        await Pago.findByIdAndDelete(idPago);
        return res.status(200).json({message: "Pago eliminado correctamente"});
    }catch(error){
        console.error("Error al eliminar pago:", error);
        return res.status(500).json({error: "Error al eliminar pago"});
    }
};
export const updatePago = async (req: Request, res: Response) => {
  try {
    const { idPago } = req.params;
    const updatedPago = await Pago.findByIdAndUpdate(idPago, req.body, { new: true });
    return res.json(updatedPago);
  } catch (error) {
    console.error("Error al actualizar pago:", error);
    return res.status(500).json({ error: "Error al actualizar pago" });
  }
};
export const getAllPagos = async (req: Request, res: Response) => {
  try {
    // Trae todos los pagos y hace populate para mostrar datos del alumno
    const pagos = await Pago.find().populate("alumno").sort({ fecha: -1 });
    return res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener todos los pagos:", error);
    return res.status(500).json({ error: "Error al obtener todos los pagos" });
  }
};
export const getPagos = async (req: Request, res: Response) => {
  try {
    console.log("Query recibida:", req.query);

    const { page = "1", limit = "50", startDate, endDate, metodo_pago } = req.query;

    const query: any = {};

    // Filtro por fecha
    if (startDate || endDate) {
      query.fecha = {};
      if (startDate) query.fecha.$gte = new Date(startDate as string);
      if (endDate) {
        const fin = new Date(endDate as string);
        fin.setHours(23, 59, 59, 999); // incluir todo el día
        query.fecha.$lte = fin;
      }
    }

    // Filtro por método de pago
    if (metodo_pago) {
      query.metodo_pago = metodo_pago;
    }

    const pagos = await Pago.find(query)
      .populate("alumno")
      .sort({ fecha: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Pago.countDocuments(query);

    return res.status(200).json({
      data: pagos,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return res.status(500).json({ error: "Error al obtener pagos" });
  }
};
export const getTotales = async (req: Request, res: Response) => {
  try {
    console.log("Query recibida para totales:", req.query);
    const { startDate, endDate } = req.query;

    const match: any = {};
    if (startDate || endDate) {
      match.fecha = {};
      if (startDate) match.fecha.$gte = new Date(startDate as string);
      if (endDate) {
        const fin = new Date(endDate as string);
        fin.setHours(23, 59, 59, 999);
        match.fecha.$lte = fin;
      }
    }

    const result = await Pago.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$metodo_pago",
          totalPorMetodo: { $sum: "$monto" },
        },
      },
    ]);

    const totalGeneral = result.reduce((acc, r) => acc + r.totalPorMetodo, 0);

    return res.status(200).json({
      totalGeneral,
      detalle: result || [], // [{ _id: "efectivo", totalPorMetodo: 5000 }, ...]
    });
  } catch (error) {
    console.error("Error al calcular totales:", error);
    return res.status(500).json({ error: "Error al calcular totales" });
  }
};

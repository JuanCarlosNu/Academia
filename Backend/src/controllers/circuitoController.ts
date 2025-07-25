import circuito from "../models/circuito";
import { Request, Response } from "express";

export const getCircuitos = async (req: Request, res: Response) => {
  try {
    const circuitos = await circuito.find();
    res.status(200).json(circuitos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los circuitos", error });
  }
}

export const createCircuito = async (req: Request, res: Response) => {
  try {
    const { nombre, ubicacion } = req.body;
    const nuevoCircuito = new circuito({ nombre, ubicacion });
    await nuevoCircuito.save();
    res.status(201).json(nuevoCircuito);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el circuito", error });
  }
}

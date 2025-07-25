import { Request, Response } from 'express';
import Clase from '../models/Clases';

export const getClases = async (req: Request, res: Response) => {
  try {
    const clases = await Clase.find()
      .populate('profesor')
      .populate('circuito')
      .populate('alumnos');
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las clases', error });
  }
};

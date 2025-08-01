import { Request, Response } from 'express';
import Clase from '../models/Clases';
import Alumno from '../models/alumno';

export const crearClase = async (req:Request, res: Response) => {
  try {
    const { fecha, hora, alumno, estado } = req.body;

    // Validar existencia del alumno

    const alumnoExiste = await Alumno.findById(alumno);
    if (!alumnoExiste) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    // Validar solapamiento (opcional)
    const claseExistente = await Clase.findOne({ fecha, hora, alumno });
    if (claseExistente) {
      return res.status(400).json({ error: 'Ya existe una clase para ese alumno en ese horario' });
    }

    const nuevaClase = new Clase({ fecha, hora, alumno, estado });
    await nuevaClase.save();

    res.status(201).json(nuevaClase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la clase' });
  }
};

export const getClases = async (req: Request, res: Response) => {
  try {
    const clases = await Clase.find()
      .populate('profesor')
      .populate('circuito')
      .populate('alumno');
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las clases', error });
  }
};

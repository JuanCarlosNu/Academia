import alumno from "../models/alumno";
import { Request, Response } from "express";

export const getAlumnos = async (req: Request, res: Response) => {
  try {
    const alumnos = await alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los alumnos", error });
  }
};

export const createAlumno = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, teléfono, email, edad } = req.body;
    const nuevoAlumno = new alumno({ nombre, apellido, teléfono, email, edad });
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el alumno", error });
  }             
}

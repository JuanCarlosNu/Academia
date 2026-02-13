import profesor from "../models/profesor";
import { Request, Response } from "express";

export const getProfesores = async (req: Request, res: Response) => {
  try {
    const profesores = await profesor.find();
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los profesores", error });
  }
};

export const createProfesor = async (req: Request, res: Response) => {
  try {
    const { nombre, email, teléfono } = req.body;
    
    const nuevoProfesor = new profesor({ nombre, email, teléfono });

    await nuevoProfesor.save();

    res.status(201).json(nuevoProfesor);
    
  } catch (error) {
    res.status(500).json({ message: "Error al crear el profesor", error });
  }
}
export const updateProfesor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, email, teléfono } = req.body;

    const actualizado = await profesor.findByIdAndUpdate(
      id,
      { nombre, email, teléfono },
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el profesor", error });
  }
};

export const deleteProfesor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const eliminado = await profesor.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    res.status(200).json({ message: "Profesor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el profesor", error });
  }
};


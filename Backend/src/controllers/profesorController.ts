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
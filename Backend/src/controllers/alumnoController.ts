import alumno from "../models/alumno";
import { Request, Response } from "express";

export const getAlumnos = async (req: Request, res: Response) => {
  try {
    const alumnos = await alumno.find().sort({ createdAt: -1 });
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los alumnos", error });
  }
};

export const createAlumno = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, telefono, email, edad } = req.body;
    const nuevoAlumno = new alumno({ nombre, apellido, telefono, email, edad });
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el alumno", error });
  }             
}
export const getAlumnoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alumnoEncontrado = await alumno.findById(id);
    if (!alumnoEncontrado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.status(200).json(alumnoEncontrado);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el alumno", error });
  }
};
export const updateAlumno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, edad } = req.body;
    const alumnoActualizado = await alumno.findByIdAndUpdate(
      id,
      { nombre, apellido, telefono, email, edad },
      { new: true }
    );
    if (!alumnoActualizado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.status(200).json(alumnoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el alumno", error });
  }
};
export const deleteAlumno = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alumnoEliminado = await alumno.findByIdAndDelete(id);
    if (!alumnoEliminado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.status(200).json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el alumno", error });
  }
};

export const updateClasesRestantes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { delta } = req.body;

    if (typeof delta !== "number") {
      return res.status(400).json({ message: "Delta debe ser un número" });
    }

    const alumnoActualizado = await alumno.findByIdAndUpdate(
      id,
      { $inc: { clasesRestantes: delta } },
      { new: true }
    );

    if (!alumnoActualizado) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    return res.status(200).json(alumnoActualizado);

  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar clases restantes",
      error,
    });
  }
};

// src/Hooks/useAlumnos.ts
import { useEffect, useState } from "react";

import {
  getAlumnos,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  patchAlumno,
  updateClasesRestantes,
} from "../Utils/alumnos.api";

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlumnos = async () => {
    try {
      setLoading(true);
      const res = await getAlumnos();
      setAlumnos(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return {
    alumnos,
    loading,
    error,
    fetchAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    patchAlumno,
    updateClasesRestantes,
  };
}

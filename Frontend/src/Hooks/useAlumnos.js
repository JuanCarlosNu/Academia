// src/Hooks/useAlumnos.ts
import { useEffect, useState } from "react";

import {
  getAlumnos,
  createAlumno as apiCreate,
  updateAlumno as apiUpdate,
  deleteAlumno as apiDelete,
  patchAlumno,
  updateClasesRestantes,
} from "../Utils/alumnos.api";

export function useAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
  const createAlumno = async (data) => {
    try {
      setSaving(true);
      await apiCreate(data);
      setSuccess("Alumno creado correctamente");
      fetchAlumnos();
    } catch (err) {
      setError("Error al crear alumno");
    } finally {
      setSaving(false);
    }
  };
  const updateAlumno = async (id, data) => {
    try {
      setSaving(true);
      await apiUpdate(id, data);
      setSuccess("Alumno actualizado");
      fetchAlumnos();
    } catch (err) {
      setError("Error al actualizar alumno");
    } finally {
      setSaving(false);
    }
  };
  const deleteAlumno = async (id) => {
    try {
      setDeleting(true);
      await apiDelete(id);
      setSuccess("Alumno eliminado");
      fetchAlumnos();
    } catch (err) {
      setError("Error al eliminar alumno");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    alumnos,
    loading,
    saving,
    deleting,
    success,
    error,
    fetchAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    patchAlumno,
    updateClasesRestantes,
  };
}

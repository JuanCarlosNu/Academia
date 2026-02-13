// src/features/profesores/Hooks/useProfesores.js
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export function useProfesores() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchProfesores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/profesores`);
      setProfesores(res.data);
    } catch (err) {
      setError("Error al cargar profesores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  const createProfesor = async (data) => {
    setSaving(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/profesores`, data);
      setProfesores((prev) => [...prev, res.data]);
      setSuccess("Profesor creado correctamente");
    } catch (err) {
      setError("Error al crear profesor");
    } finally {
      setSaving(false);
    }
  };

  const updateProfesor = async (id, data) => {
    setSaving(true);
    setError(null);
    try {
      const res = await axios.put(`${API_URL}/profesores/${id}`, data);
      setProfesores((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      setSuccess("Profesor actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar profesor");
    } finally {
      setSaving(false);
    }
  };

  const deleteProfesor = async (id) => {
    setDeleting(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/profesores/${id}`);
      setProfesores((prev) => prev.filter((p) => p._id !== id));
      setSuccess("Profesor eliminado correctamente");
    } catch (err) {
      setError("Error al eliminar profesor");
    } finally {
      setDeleting(false);
    }
  };

  return {
    profesores,
    loading,
    saving,
    deleting,
    error,
    success,
    fetchProfesores,
    createProfesor,
    updateProfesor,
    deleteProfesor,
  };
}

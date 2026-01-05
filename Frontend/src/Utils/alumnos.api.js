// src/components/Utils/alumnos.api.js
import axios from "axios"; // o desde tu axios.config si lo tenés y lo querés usar
import api from "./api"; // Si querés usar la configuración de axios con interceptores

const API_URL =
  process.env.REACT_APP_BACKEND_URL_RENDER ||
  process.env.REACT_APP_BACKEND_URL_RAILWAY ||
  "http://localhost:3001";

export const getAlumnos = () => api.get("/alumnos");
export const getAlumnoById = (id) => api.get(`/alumnos/${id}`);
export const createAlumno = (data) => api.post("/alumnos", data);
export const updateAlumno = (id, data) => api.put(`/alumnos/${id}`, data);
export const patchAlumno = (id, data) => api.patch(`/alumnos/${id}`, data);
export const deleteAlumno = (id) => api.delete(`/alumnos/${id}`);
export const updateClasesRestantes = (id, delta) =>
  api.patch(`/alumnos/${id}/clases`, { delta });
export const getClasesRestantes = (id) =>
  api.get(`/alumnos/${id}/clases-restantes`);
export const getPagosByAlumno = (id) => api.get(`/pagos/${id}`);
export const createPago = (pagoData) => api.post("/pagos", pagoData);

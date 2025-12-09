// src/components/Utils/alumnos.api.js
import axios from "axios"; // o desde tu axios.config si lo tenés y lo querés usar
const API_URL =
  process.env.REACT_APP_BACKEND_URL_RENDER ||
  process.env.REACT_APP_BACKEND_URL_RAILWAY ||
  "http://localhost:3001";

export const getAlumnos = () => axios.get(`${API_URL}/api/alumnos`);
export const getAlumnoById = (id) => axios.get(`${API_URL}/api/alumnos/${id}`);
export const createAlumno = (data) =>
  axios.post(`${API_URL}/api/alumnos`, data);
export const updateAlumno = (id, data) =>
  axios.put(`${API_URL}/api/alumnos/${id}`, data);
export const patchAlumno = (id, data) =>
  axios.patch(`/api/alumnos/${id}`, data);
export const updateClasesRestantes = (id, delta) =>
  axios.patch(`/api/alumnos/${id}/clases`, { delta });
export const deleteAlumno = (id) => axios.delete(`/api/alumnos/${id}`);

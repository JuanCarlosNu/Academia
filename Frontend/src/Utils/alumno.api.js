import axios from "axios";

// Obtener todos los alumnos
export const fetchAlumnos = () => {
  return axios.get("/alumnos");
};
// Obtener un alumno por ID
export const fetchAlumnoById = (id) => {
  return axios.get(`/alumnos/${id}`);
};
// Crear alumno
export const createAlumno = (data) => {
  return axios.post("/alumnos", data);
};
// Actualizar alumno (PUT completo)
export const updateAlumno = (id, data) => {
  return axios.put(`/alumnos/${id}`, data);
};
// Actualización parcial (PATCH)
export const patchAlumno = (id, data) => {
  return axios.patch(`/alumnos/${id}`, data);
};
// Actualizar clases restantes (+1, -1, etc.)
export const updateClasesRestantes = (id, delta) => {
  return axios.patch(`/alumnos/${id}/clases`, { delta });
};
// Eliminar alumno
export const deleteAlumno = (id) => {
  return axios.delete(`/alumnos/${id}`);
};

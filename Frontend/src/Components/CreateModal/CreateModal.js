import React, { useEffect, useState } from "react";
import "./CreateModal.css";
import axios from "axios";
import { API_URL } from "../../Pages/Clases";

function CreateModal({ onClose, onCreate }) {
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [circuitos, setCircuitos] = useState([]);

  const [profesorId, setProfesorId] = useState("");
  const [alumnoId, setAlumnoId] = useState("");
  const [circuitoId, setCircuitoId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/profesores`).then((res) => {
      setProfesores(res.data);
    });
    axios.get(`${API_URL}/api/alumnos`).then((res) => {
      setAlumnos(res.data);
    });
    axios.get(`${API_URL}/api/circuitos`).then((res) => {
      setCircuitos(res.data);
    });
  }, []);

  const handleSubmit = async () => {
    if (!profesorId || !alumnoId || !circuitoId || !fecha || !hora) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    //const token = localStorage.getItem("token");

    /*const nuevaClase = {
      profesorId,
      alumnoId,
      circuitoId,
      fecha,
      hora,
      estado: "pendiente",
    };*/
    const ClaseTraducida = {
      profesor: profesorId,
      alumno: alumnoId,
      circuito: circuitoId,
      fecha: fecha,
      hora: hora,
      estado: "pendiente",
    };

    try {
      console.log("Enviando nueva clase:", ClaseTraducida);
      const response = await axios.post(
        `${API_URL}/api/clases`,
        ClaseTraducida
        /*{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }*/
      );
      console.log("Clase creada:", response.data);
      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error("Error al crear la clase:", error);
      alert("No se pudo crear la clase.");
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Crear Nueva Clase</h3>
        <label>Profesor:</label>
        <select
          value={profesorId || ""}
          onChange={(e) => setProfesorId(e.target.value)}
        >
          <option value="">Seleccione un profesor</option>
          {profesores.map((profesor) => (
            <option key={profesor._id} value={profesor._id}>
              {profesor.nombre}
            </option>
          ))}
        </select>
        <label>Alumno:</label>
        <select
          value={alumnoId || ""}
          onChange={(e) => setAlumnoId(e.target.value)}
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((alumno) => (
            <option key={alumno._id} value={alumno._id}>
              {alumno.nombre}
            </option>
          ))}
        </select>
        <label>Circuito:</label>
        <select
          value={circuitoId || ""}
          onChange={(e) => setCircuitoId(e.target.value)}
        >
          <option value="">Seleccione un circuito</option>
          {circuitos.map((circuito) => (
            <option key={circuito._id} value={circuito._id}>
              {circuito.nombre}
            </option>
          ))}
        </select>
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <label>Hora:</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <button onClick={handleSubmit}>Crear Clase</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
export default CreateModal;

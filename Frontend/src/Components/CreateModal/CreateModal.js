import React, { useEffect, useState } from "react";
import "./CreateModal.css";
import axios from "axios";
import { API_URL } from "../../Pages/Clases";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";

function CreateModal({
  onClose,
  onCreate,
  claseNueva,
  setClaseNueva,
  onConfirm,
  classesOfDay,
}) {
  const [profesores, setProfesores] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [circuitos, setCircuitos] = useState([]);

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
    if (
      !claseNueva.profesorId ||
      !claseNueva.alumnoId ||
      !claseNueva.circuitoId ||
      !claseNueva.date ||
      !claseNueva.time
    ) {
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
      profesor: claseNueva.profesorId,
      alumno: claseNueva.alumnoId,
      circuito: claseNueva.circuitoId,
      fecha: claseNueva.date.toISOString().split("T")[0],
      hora: claseNueva.time,
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
  console.log("Clases del día en CreateModal:", classesOfDay);
  const horariosOcupados = classesOfDay
    .filter((bloque) => bloque.clase !== null)
    .map((bloque) => bloque.time);
  const horariosDisponibles = HORARIOS_DEL_DIA.filter(
    (hora) => !horariosOcupados.includes(hora)
  );
  console.log("Horarios ocupados para nueva clase:", horariosOcupados);
  console.log("Horarios disponibles para nueva clase:", horariosDisponibles);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Crear Nueva Clase</h3>
        <label>Profesor:</label>
        <select
          value={claseNueva?.profesorId || ""}
          onChange={(e) =>
            setClaseNueva({ ...claseNueva, profesorId: e.target.value })
          }
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
          value={claseNueva?.alumnoId || ""}
          onChange={(e) =>
            setClaseNueva({ ...claseNueva, alumnoId: e.target.value })
          }
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
          value={claseNueva?.circuitoId || ""}
          onChange={(e) =>
            setClaseNueva({ ...claseNueva, circuitoId: e.target.value })
          }
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
          value={
            claseNueva?.date ? claseNueva.date.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            setClaseNueva({ ...claseNueva, date: new Date(e.target.value) })
          }
        />
        <label>Hora:</label>
        <select
          value={claseNueva?.time || ""}
          onChange={(e) =>
            setClaseNueva({ ...claseNueva, time: e.target.value })
          }
        >
          <option value="">Seleccione un horario</option>
          {horariosDisponibles.map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit}>Crear Clase</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
export default CreateModal;

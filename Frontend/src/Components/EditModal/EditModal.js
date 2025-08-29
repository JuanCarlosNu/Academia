import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ clase, onClose, onSave, currentDate }) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    alumno: "",
    circuito: "",
    estado: "",
  });

  useEffect(() => {
    if (clase) {
      setFormData({
        fecha: clase.fecha || currentDate.toISOString().slice(0, 10), // toma la fecha desde currentDate
        hora: clase.time, // unificado
        alumno: clase.alumnoId,
        circuito: clase.circuit,
        estado: clase.estado,
      });
    }
  }, [clase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Datos del formulario:", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clase que se va a editar:", clase);
    console.log("Datos enviados al backend:", formData);
    onSave(clase.id, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Clase</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Fecha:
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Hora:
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Alumno:
            <input
              type="text"
              name="alumno"
              value={formData.alumno}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Circuito:
            <input
              type="text"
              name="circuito"
              value={formData.circuito}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Estado:
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="reservada">Reservada</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
              <option value="completada">Completada</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </label>

          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

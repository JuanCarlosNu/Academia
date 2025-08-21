import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ clase, onClose, onSave }) {
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
        fecha: clase.fecha,
        hora: clase.time, // unificado
        alumno: clase.student,
        circuito: clase.circuit,
        estado: clase.estado,
      });
    }
  }, [clase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clase que se va a editar:", clase);

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

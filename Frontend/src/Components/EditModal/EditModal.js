import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ clase, onClose, onSave }) {
  const [formData, setFormData] = useState({
    time: "",
    estado: "",
  });

  useEffect(() => {
    if (clase) {
      setFormData({
        time: clase.time,
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
    onSave(clase.id, formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Clase</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Hora:
            <input
              type="time"
              name="time"
              value={formData.time}
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

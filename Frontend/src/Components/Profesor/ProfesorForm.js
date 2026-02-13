// src/features/profesores/Components/Profesor/ProfesorForm.js
import React, { useState, useEffect } from "react";
import "./ProfesorForm.css";

export default function ProfesorForm({ initialData, onSubmit, saving }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    teléfono: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        email: initialData.email || "",
        teléfono: initialData.teléfono || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: "", email: "", teléfono: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="profesor-form inline-form">
      <div className="form-group">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="teléfono"
          placeholder="Teléfono"
          value={formData.teléfono}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={saving} className="btn-submit">
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

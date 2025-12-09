// src/features/alumnos/components/AlumnoForm.tsx
import React, { useState } from "react";

export default function AlumnoForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(
    initialData || {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      edad: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        placeholder="Apellido"
      />
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="edad"
        value={form.edad}
        onChange={handleChange}
        placeholder="Edad"
      />

      <button type="submit">Guardar</button>
    </form>
  );
}

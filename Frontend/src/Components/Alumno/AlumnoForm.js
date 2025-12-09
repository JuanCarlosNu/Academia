// src/components/Alumnos/AlumnoForm.js
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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio";

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (form.edad && isNaN(Number(form.edad))) {
      newErrors.edad = "La edad debe ser un número";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="alumno-form">
      <div>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}
      </div>

      <div>
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />
        {errors.apellido && <p className="error">{errors.apellido}</p>}
      </div>

      <div>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
      </div>

      <div>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <input
          name="edad"
          value={form.edad}
          onChange={handleChange}
          placeholder="Edad"
        />
        {errors.edad && <p className="error">{errors.edad}</p>}
      </div>

      <button type="submit">{initialData ? "Actualizar" : "Crear"}</button>
    </form>
  );
}

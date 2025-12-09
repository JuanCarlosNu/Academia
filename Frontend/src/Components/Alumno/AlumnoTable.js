// src/features/alumnos/components/AlumnoTable.tsx
import React from "react";

export default function AlumnoTable({ alumnos, onEdit, onDelete }) {
  return (
    <table className="tabla-alumnos">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Clases restantes</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {alumnos.map((a) => (
          <tr key={a._id}>
            <td>
              {a.nombre} {a.apellido}
            </td>
            <td>{a.telefono}</td>
            <td>{a.email}</td>
            <td>{a.clases_restantes}</td>
            <td>
              <button onClick={() => onEdit(a)}>Editar</button>
              <button onClick={() => onDelete(a._id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// src/features/alumnos/components/AlumnoTable.tsx
import React from "react";
import "./AlumnoTable.css";
export default function AlumnoTable({ alumnos, onEdit, onDelete, deleting }) {
  return (
    <table className="table">
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
              <button className="btn-edit" onClick={() => onEdit(a)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(a._id)}
                disabled={deleting}
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

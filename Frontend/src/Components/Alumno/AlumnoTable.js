// src/features/alumnos/components/AlumnoTable.tsx
import React from "react";
import "./AlumnoTable.css";
import { useAuth } from "../../Context/AuthContext";
export default function AlumnoTable({
  alumnos,
  onEdit,
  onDelete,
  deleting,
  onSort,
}) {
  const { user } = useAuth();
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
        <th onClick={() => onSort("nombre")}>Nombre</th>
        <th onClick={() => onSort("apellido")}>Apellido</th>
        <th onClick={() => onSort("email")}>Email</th>
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
              {user && user.rol === "admin" && (
                <button className="btn-edit" onClick={() => onEdit(a)}>
                  Editar
                </button>
              )}
              {user && user.rol === "admin" && (
                <button
                  className="btn-delete"
                  onClick={() => onDelete(a._id)}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar"}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

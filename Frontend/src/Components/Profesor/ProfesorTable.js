// src/features/profesores/Components/Profesor/ProfesorTable.js
import React from "react";
import "./ProfesorTable.css";

export default function ProfesorTable({
  profesores,
  onEdit,
  onDelete,
  onSort,
  deleting,
  sortField,
  sortOrder,
}) {
  const renderSortArrow = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? " ▲" : " ▼";
  };

  return (
    <table className="profesor-table">
      <thead>
        <tr>
          <th onClick={() => onSort("nombre")}>
            Nombre{renderSortArrow("nombre")}
          </th>
          <th onClick={() => onSort("email")}>
            Email{renderSortArrow("email")}
          </th>
          <th onClick={() => onSort("teléfono")}>
            Teléfono{renderSortArrow("teléfono")}
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {profesores.map((p) => (
          <tr key={p._id}>
            <td>{p.nombre}</td>
            <td>{p.email}</td>
            <td>{p.teléfono}</td>
            <td>
              <button className="btn-edit" onClick={() => onEdit(p)}>
                ✏️ Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(p._id)}
                disabled={deleting}
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

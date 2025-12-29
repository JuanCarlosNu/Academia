// src/features/alumnos/components/AlumnoTable.tsx
import React, { useEffect, useState } from "react";
import "./AlumnoTable.css";
import { useAuth } from "../../Context/AuthContext";
import { getClasesRestantes } from "../../Utils/alumnos.api";

const AlumnoRow = ({ alumno, onEdit, onDelete, deleting, user }) => {
  const [clasesRestantes, setClasesRestantes] = useState(null);

  useEffect(() => {
    const fetchClasesRestantes = async () => {
      try {
        const res = await getClasesRestantes(alumno._id);
        // asegúrate de usar la misma key que devuelve tu backend
        setClasesRestantes(res.data.clasesRestantes);
      } catch (error) {
        console.error("Error al obtener clases restantes:", error);
      }
    };
    fetchClasesRestantes();
  }, [alumno._id]);

  return (
    <tr key={alumno._id}>
      <td>{alumno.nombre}</td>
      <td>{alumno.apellido}</td>
      <td>{alumno.telefono}</td>
      <td>{alumno.email}</td>
      <td>{clasesRestantes !== null ? clasesRestantes : "Cargando..."}</td>
      <td>
        {alumno.proximaClase
          ? `${alumno.proximaClase.fecha} ${alumno.proximaClase.hora}`
          : "Sin clases próximas"}
      </td>
      <td>
        {user && user.rol === "admin" && (
          <button className="btn-edit" onClick={() => onEdit(alumno)}>
            Editar
          </button>
        )}
        {user && user.rol === "admin" && (
          <button
            className="btn-delete"
            onClick={() => onDelete(alumno._id)}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        )}
      </td>
    </tr>
  );
};

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
          <th onClick={() => onSort("nombre")}>Nombre</th>
          <th onClick={() => onSort("apellido")}>Apellido</th>
          <th>Teléfono</th>
          <th onClick={() => onSort("email")}>Email</th>
          <th>Clases restantes</th>
          <th>Próxima clase</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((a) => (
          <AlumnoRow
            key={a._id}
            alumno={a}
            onEdit={onEdit}
            onDelete={onDelete}
            deleting={deleting}
            user={user}
          />
        ))}
      </tbody>
    </table>
  );
}

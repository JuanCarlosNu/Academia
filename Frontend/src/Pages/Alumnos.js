// src/features/alumnos/pages/AlumnosPage.tsx
import React, { useState } from "react";
import { useAlumnos } from "../Hooks/useAlumnos";
import AlumnoForm from "../Components/Alumno/AlumnoForm";
import AlumnoTable from "../Components/Alumno/AlumnoTable";

export default function AlumnosPage() {
  const {
    alumnos,
    loading,
    fetchAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
  } = useAlumnos();

  const [editing, setEditing] = useState(null);

  const handleCreate = async (data) => {
    await createAlumno(data);
    fetchAlumnos();
  };

  const handleUpdate = async (data) => {
    await updateAlumno(editing._id, data);
    setEditing(null);
    fetchAlumnos();
  };

  const handleDelete = async (id) => {
    await deleteAlumno(id);
    fetchAlumnos();
  };

  if (loading) return <p>Cargando alumnos...</p>;

  return (
    <div>
      <h1>Alumnos</h1>

      {editing ? (
        <AlumnoForm initialData={editing} onSubmit={handleUpdate} />
      ) : (
        <AlumnoForm onSubmit={handleCreate} />
      )}

      <AlumnoTable
        alumnos={alumnos}
        onEdit={(a) => setEditing(a)}
        onDelete={handleDelete}
      />
    </div>
  );
}

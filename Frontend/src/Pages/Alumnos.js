// src/features/alumnos/pages/AlumnosPage.tsx
import React, { useState } from "react";
import { useAlumnos } from "../Hooks/useAlumnos";
import AlumnoForm from "../Components/Alumno/AlumnoForm";
import AlumnoTable from "../Components/Alumno/AlumnoTable";
import ConfirmModal from "../Components/ConfirmdelModal/ConfirmModal";

export default function AlumnosPage() {
  const {
    alumnos,
    loading,
    saving,
    deleting,
    error,
    success,
    fetchAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
  } = useAlumnos();

  const [editing, setEditing] = useState(null);

  // ✅ Estados del modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleCreate = (data) => createAlumno(data);
  const handleUpdate = (data) => {
    updateAlumno(editing._id, data);
    setEditing(null);
  };
  const handleDelete = (id) => {
    deleteAlumno(id);
  };

  // ✅ Cuando el usuario hace click en eliminar
  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };
  // ✅ Cuando confirma
  const confirmDelete = () => {
    deleteAlumno(pendingDeleteId);
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  // ✅ Cuando cancela
  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  if (loading) return <p>Cargando alumnos...</p>;

  return (
    <div className="Alumnos-page">
      <h1>Alumnos</h1>
      {/*success and error messages */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {editing ? (
        <AlumnoForm
          initialData={editing}
          onSubmit={handleUpdate}
          saving={saving}
        />
      ) : (
        <AlumnoForm onSubmit={handleCreate} saving={saving} />
      )}

      <AlumnoTable
        alumnos={alumnos}
        onEdit={(a) => {
          setEditing(a);
        }}
        onDelete={handleDeleteRequest}
        deleting={deleting}
      />
      <ConfirmModal
        open={confirmOpen}
        message="¿Estás seguro de que deseas eliminar este alumno?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

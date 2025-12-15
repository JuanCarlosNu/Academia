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

  //Estados búsqueda y filtro
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  //  ✅ filtrado en tiempo real con prevent null errors
  const filteredAlumnos = alumnos.filter((alumno) => {
    const nombre = alumno.nombre?.toLowerCase() || "";
    const apellido = alumno.apellido?.toLowerCase() || "";
    const email = alumno.email?.toLowerCase() || "";
    const query = search.toLowerCase();

    return (
      nombre.includes(query) ||
      apellido.includes(query) ||
      email.includes(query)
    );
  });
  // ✅ Ordenamiento dinámico
  const sortedAlumnos = [...filteredAlumnos].sort((a, b) => {
    if (!sortField) return 0;

    const valueA = a[sortField]?.toString().toLowerCase();
    const valueB = b[sortField]?.toString().toLowerCase();

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

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
  // Sort function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
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
      <input
        type="text"
        placeholder="Buscar alumno..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <AlumnoTable
        onSort={handleSort}
        alumnos={sortedAlumnos}
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

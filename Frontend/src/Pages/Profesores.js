// src/features/profesores/pages/ProfesoresPage.js
import React, { useState } from "react";
import { useProfesores } from "../Hooks/useProfesores";
import ProfesorForm from "../Components/Profesor/ProfesorForm";
import ProfesorTable from "../Components/Profesor/ProfesorTable";
import ConfirmModal from "../Components/Profesor/ConfirmModal";

export default function ProfesoresPage() {
  const {
    profesores,
    loading,
    saving,
    deleting,
    error,
    success,
    createProfesor,
    updateProfesor,
    deleteProfesor,
  } = useProfesores();

  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // búsqueda y ordenamiento
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // filtrado
  const filteredProfesores = profesores.filter((p) => {
    const nombre = p.nombre?.toLowerCase() || "";
    const email = p.email?.toLowerCase() || "";
    const telefono = p.teléfono?.toLowerCase() || "";
    const query = search.toLowerCase();
    return (
      nombre.includes(query) ||
      email.includes(query) ||
      telefono.includes(query)
    );
  });

  // ordenamiento
  const sortedProfesores = [...filteredProfesores].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField]?.toString().toLowerCase();
    const valueB = b[sortField]?.toString().toLowerCase();
    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleCreate = (data) => createProfesor(data);
  const handleUpdate = (data) => {
    updateProfesor(editing._id, data);
    setEditing(null);
  };

  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };
  const confirmDelete = () => {
    deleteProfesor(pendingDeleteId);
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };
  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <p>Cargando profesores...</p>;

  return (
    <div className="Profesores-page">
      <h1>Profesores</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {editing ? (
        <ProfesorForm
          initialData={editing}
          onSubmit={handleUpdate}
          saving={saving}
        />
      ) : (
        <ProfesorForm onSubmit={handleCreate} saving={saving} />
      )}

      <input
        type="text"
        placeholder="Buscar profesor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ProfesorTable
        profesores={sortedProfesores}
        onSort={handleSort}
        onEdit={(p) => setEditing(p)}
        onDelete={handleDeleteRequest}
        deleting={deleting}
        sortOrder={sortOrder}
        sortField={sortField}
      />

      <ConfirmModal
        open={confirmOpen}
        message="¿Estás seguro de que deseas eliminar este profesor?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

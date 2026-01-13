// src/features/alumnos/components/AlumnoTable.tsx
import React, { useEffect, useState } from "react";
import "./AlumnoTable.css";
import { useAuth } from "../../Context/AuthContext";
import { getClasesRestantes } from "../../Utils/alumnos.api";
import AlumnoPagos from "./AlumnoPagos";
import PagoForm from "../Pago/pagoForm";
import { createPago } from "../../Utils/alumnos.api";
const AlumnoRow = ({
  alumno,
  onEdit,
  onDelete,
  deleting,
  user,
  onShowPagos,
  refreshKey,
}) => {
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
  }, [alumno._id, refreshKey]);

  return (
    <>
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
          <button className="btn-pagos" onClick={onShowPagos}>
            Ver pagos
          </button>
        </td>
      </tr>
    </>
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
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // 👈 para refrescar pagos

  return (
    <div className="alumno-table-container">
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
              onShowPagos={() => setSelectedAlumno(a)}
              refreshKey={refreshKey}
            />
          ))}
        </tbody>
      </table>
      {/* Panel aparte para historial */}
      {selectedAlumno && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              Historial de pagos de {selectedAlumno.nombre}{" "}
              {selectedAlumno.apellido}
            </h3>
            <button
              className="modal-close"
              onClick={() => setSelectedAlumno(null)}
            >
              Cerrar
            </button>
            <PagoForm
              mode="alumno"
              alumnoId={selectedAlumno._id}
              onSuccess={async (payload) => {
                await createPago(payload); // 👈 ahora sí se crea en backend
                setRefreshKey(Date.now()); // refresca historial y clases restantes
              }}
              // 👈 fuerza refresco
            />
            <AlumnoPagos
              alumnoId={selectedAlumno._id}
              refreshKey={refreshKey}
            />
          </div>
        </div>
      )}
    </div>
  );
}

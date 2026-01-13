import React, { useEffect, useState } from "react";
import {
  getPagos,
  createPago,
  updatePago,
  deletePago,
  getAlumnos, // 👈 añadimos la función para traer alumnos
} from "../Utils/alumnos.api";
import PagoForm from "../Components/Pago/pagoForm";
import PagoEditForm from "../Components/Pago/pagoEditForm";
import "./Pagos.css";

export default function PagosPage() {
  const [pagos, setPagos] = useState([]);
  const [alumnos, setAlumnos] = useState([]); // 👈 estado para alumnos
  const [selectedPago, setSelectedPago] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar todos los pagos y alumnos al montar la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPagos = await getPagos();
        setPagos(resPagos.data);

        const resAlumnos = await getAlumnos();
        setAlumnos(resAlumnos.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchPagos = async () => {
    try {
      const res = await getPagos();
      setPagos(res.data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    }
  };

  const handleCreatePago = async (pagoData) => {
    try {
      await createPago(pagoData);
      fetchPagos();
    } catch (error) {
      console.error("Error al crear pago:", error);
    }
  };

  const handleUpdatePago = async (id, pagoData) => {
    try {
      await updatePago(id, pagoData);
      fetchPagos();
      setSelectedPago(null);
    } catch (error) {
      console.error("Error al actualizar pago:", error);
    }
  };

  const handleDeletePago = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este pago?")) return;
    try {
      await deletePago(id);
      fetchPagos();
    } catch (error) {
      console.error("Error al eliminar pago:", error);
    }
  };

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div className="pagos-page">
      <h2>Gestión de Pagos</h2>

      {/* Formulario de agendar pago con selector de alumno */}
      <PagoForm mode="global" alumnos={alumnos} onSuccess={handleCreatePago} />

      {/* Tabla de pagos */}
      <table className="table">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Método</th>
            <th>Clases</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p._id}>
              <td>
                {p.alumno?.nombre} {p.alumno?.apellido}
              </td>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
              <td>{p.monto}</td>
              <td>{p.metodo_pago}</td>
              <td>{p.cantidad_clases_pagadas}</td>
              <td>
                <button onClick={() => setSelectedPago(p)}>Editar</button>
                <button onClick={() => handleDeletePago(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {selectedPago && (
        <PagoEditForm
          pago={selectedPago}
          onSave={(data) => handleUpdatePago(selectedPago._id, data)}
          onCancel={() => setSelectedPago(null)}
        />
      )}
    </div>
  );
}

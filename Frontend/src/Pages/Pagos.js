import React, { useEffect, useState } from "react";
import {
  getPagos,
  createPago,
  updatePago,
  deletePago,
  getAlumnos,
  getTotales,
} from "../Utils/alumnos.api";
import PagoForm from "../Components/Pago/pagoForm";
import PagoEditForm from "../Components/Pago/pagoEditForm";
import "./Pagos.css";

export default function PagosPage() {
  const [pagos, setPagos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedPago, setSelectedPago] = useState(null);
  const [loading, setLoading] = useState(true);

  // filtros y paginación
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metodo, setMetodo] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);

  // totales
  const [totales, setTotales] = useState(null);

  // cargar alumnos al inicio
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const resAlumnos = await getAlumnos();
        setAlumnos(resAlumnos.data);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      }
    };
    fetchAlumnos();
  }, []);

  // cargar pagos y totales cada vez que cambian filtros/página
  useEffect(() => {
    fetchPagos();
    fetchTotales();
  }, [page]);

  const fetchPagos = async () => {
    setLoading(true);
    try {
      const res = await getPagos({
        //params:
        page, //1
        limit, //20
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        metodo_pago: metodo || undefined,
      });
      setPagos(res.data.data);
      setTotal(res.data.total); // cantidad de pagos totalesa a paginar
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotales = async () => {
    try {
      const res = await getTotales({
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      console.log("Totales recibidos:", res.data); /// montos totales

      setTotales(res.data);
    } catch (error) {
      console.error("Error al obtener totales:", error);
    }
  };

  const handleCreatePago = async (pagoData) => {
    console.log("Creando pago con datos:", pagoData);
    try {
      await createPago(pagoData);
      fetchPagos();
      fetchTotales();
    } catch (error) {
      console.error("Error al crear pago:", error);
    }
  };

  const handleUpdatePago = async (id, pagoData) => {
    try {
      await updatePago(id, pagoData);
      fetchPagos();
      fetchTotales();
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
      fetchTotales();
    } catch (error) {
      console.error("Error al eliminar pago:", error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div className="pagos-page">
      <h2>Gestión de Pagos</h2>

      {/* Formulario de creación */}
      <PagoForm mode="global" alumnos={alumnos} onSuccess={handleCreatePago} />

      {/* Filtros */}
      <div className="filters">
        <label>
          Desde:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Método:
          <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
            <option value="">Todos</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </label>
        <button
          className="btn-filter-submit"
          onClick={() => {
            setPage(1);
            fetchPagos();
            fetchTotales();
          }}
        >
          Aplicar filtros
        </button>
      </div>

      {/* Tabla */}
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
          {(pagos || []).map((p) => (
            <tr key={p._id}>
              <td>
                {p.alumno?.nombre} {p.alumno?.apellido}
              </td>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
              <td>${p.monto}</td>
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

      {/* Paginador */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Siguiente
        </button>
      </div>

      {/* Totales */}
      {totales && (
        <div className="totales">
          <p>
            <strong>Total general:</strong> ${totales.totalGeneral}
          </p>
          <ul>
            {(totales.detalle || []).map((d) => (
              <li key={d._id}>
                {d._id}: ${d.totalPorMetodo}
              </li>
            ))}
          </ul>
        </div>
      )}

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

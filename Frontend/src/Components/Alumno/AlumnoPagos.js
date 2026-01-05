import React, { useEffect, useState } from "react";
import { getPagosByAlumno } from "../../Utils/alumnos.api";

export default function AlumnoPagos({ alumnoId, refreshKey }) {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await getPagosByAlumno(alumnoId);
        setPagos(res.data);
      } catch (error) {
        console.error("Error al obtener pagos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPagos();
  }, [alumnoId, refreshKey]); // 👈 se vuelve a ejecutar cuando cambia refreshKey

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div className="pagos-container">
      <h3>Historial de pagos</h3>
      {pagos.length === 0 ? (
        <p>No hay pagos registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Clases pagadas</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._id}>
                <td>{new Date(pago.fecha).toLocaleDateString()}</td>
                <td>{pago.monto}</td>
                <td>{pago.metodo_pago}</td>
                <td>{pago.cantidad_clases_pagadas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { createPago } from "../../Utils/alumnos.api";

const PagoForm = ({ alumnoId, onSuccess }) => {
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [cantidadClases, setCantidadClases] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPago({
        fecha: new Date(),
        monto,
        metodo_pago: metodoPago,
        alumno: alumnoId,
        cantidad_clases_pagadas: cantidadClases,
      });
      onSuccess(); // refresca historial
      setMonto("");
      setCantidadClases("");
    } catch (error) {
      console.error("Error al registrar pago:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pago-form">
      <h4>Registrar nuevo pago</h4>
      <label>
        Monto:
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
      </label>
      <label>
        Método de pago:
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
      </label>
      <label>
        Clases pagadas:
        <input
          type="number"
          value={cantidadClases}
          onChange={(e) => setCantidadClases(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
};

export default PagoForm;

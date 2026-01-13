import React, { useState } from "react";

export default function PagoEditForm({ pago, onSave, onCancel }) {
  const [monto, setMonto] = useState(pago.monto);
  const [metodoPago, setMetodoPago] = useState(pago.metodo_pago);
  const [cantidadClases, setCantidadClases] = useState(
    pago.cantidad_clases_pagadas
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...pago,
      monto,
      metodo_pago: metodoPago,
      cantidad_clases_pagadas: cantidadClases,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Editar pago</h4>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

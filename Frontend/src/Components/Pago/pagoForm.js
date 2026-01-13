import React, { useState } from "react";
import "./pagoForm.css";

export default function PagoForm({
  mode = "alumno",
  alumnoId,
  alumnos = [],
  onSuccess,
}) {
  const [selectedAlumno, setSelectedAlumno] = useState(alumnoId || "");
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [cantidadClases, setCantidadClases] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      fecha: new Date(),
      monto,
      metodo_pago: metodoPago,
      alumno: selectedAlumno, // en "alumno" viene dado; en "global" lo selecciona el usuario
      cantidad_clases_pagadas: cantidadClases,
    };

    onSuccess(payload);

    // reset (en modo global también vaciamos el select)
    setMonto("");
    setCantidadClases("");
    if (mode === "global") setSelectedAlumno("");
  };

  return (
    <>
      <h4 className="regPago">
        {mode === "global"
          ? "Registrar pago (global)"
          : "Registrar pago del alumno"}
      </h4>
      <form onSubmit={handleSubmit} className="pago-form inline-form">
        {mode === "global" && (
          <div className="form-group">
            <label>Alumno:</label>
            <select
              value={selectedAlumno}
              onChange={(e) => setSelectedAlumno(e.target.value)}
              required
            >
              <option value="">Seleccionar alumno</option>
              {alumnos.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Monto:</label>
          <input
            placeholder="Monto"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>
        <div className="form-group">
          <label>Clases pagadas:</label>
          <input
            type="number"
            value={cantidadClases}
            onChange={(e) => setCantidadClases(e.target.value)}
            required
          />
        </div>
        <button className="btn-submit" type="submit">
          Registrar
        </button>
      </form>
    </>
  );
}

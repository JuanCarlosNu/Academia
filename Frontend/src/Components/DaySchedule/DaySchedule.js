import React from "react";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";
import { useHorarios } from "../../Hooks/useHorarios";

function DaySchedule({
  classes,
  currentDate,
  activeRange,
  onEdit,
  onCancel,
  onCrearClase,
}) {
  const { cantidadOcupadas, cantidadDisponibles } = useHorarios(
    classes,
    "día",
    HORARIOS_DEL_DIA
  );

  return (
    <div className={`day-schedule ${activeRange}`}>
      {/* Encabezado dinámico */}
      {activeRange === "día" && (
        <div className="metrics">
          <span>Ocupadas: {cantidadOcupadas}</span>
          <span>Disponibles: {cantidadDisponibles}</span>
        </div>
      )}

      {HORARIOS_DEL_DIA.map((hora) => {
        const clase = classes.find((c) => c.time === hora);

        if (clase) {
          // 🔹 Render de horario ocupado
          if (activeRange === "día") {
            return (
              <div key={hora} className="row-full">
                <p>{clase.student}</p>
                <p>{clase.circuit}</p>
                <button onClick={() => onEdit(clase)}>✏️</button>
                <button onClick={() => onCancel(clase.id)}>❌</button>
                <span>{clase.time}</span>
              </div>
            );
          }

          if (activeRange === "semana") {
            return (
              <div key={hora} className="row-mini">
                <span>{clase.time}</span>
                <span>{clase.student}</span>
                {clase.estado === "completada" ? "✅" : ""}
              </div>
            );
          }

          if (activeRange === "mes") {
            return (
              <div key={hora} className="row-summary">
                {/* En mes quizás solo un puntito o contador */}
                <span className="dot occupied"></span>
              </div>
            );
          }
        } else {
          // 🔹 Render de horario libre
          if (activeRange === "día") {
            return (
              <div key={hora} className="row-empty">
                <p>Espacio libre</p>
                <button onClick={() => onCrearClase(hora)}>➕ Agendar</button>
                <span>{hora}</span>
              </div>
            );
          }

          if (activeRange === "semana") {
            return (
              <div key={hora} className="row-free">
                <span className="rayita-verde">▮</span>
              </div>
            );
          }

          if (activeRange === "mes") {
            return (
              <div key={hora} className="row-summary">
                <span className="dot free"></span>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default DaySchedule;

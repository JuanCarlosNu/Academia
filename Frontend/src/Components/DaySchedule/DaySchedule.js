import React from "react";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";
import { useHorarios } from "../../Hooks/useHorarios";
import "./DaySchedule.css";

function DaySchedule({
  classes,
  currentDate,
  activeRange,
  onEdit,
  onCancel,
  onCrearClase,
  clasesSeleccionadas = [],
  setClasesSeleccionadas = () => {},
}) {
  console.log("DaySchedule received classes:", classes);
  // 🔹 Función para abreviar circuitos
  const abreviarCircuito = (circuit) => {
    if (!circuit) return "";
    const match = circuit.match(/\d+/); // busca el número dentro del string
    return match ? `C${match[0]}` : circuit; // devuelve C + número
  };

  return (
    <div className={`day-schedule ${activeRange}`}>
      {/* Mapea todos los horarios del día y detecta si tienen clases*/}
      {HORARIOS_DEL_DIA.map((hora) => {
        const item = classes.find((c) => c.time === hora);
        const clase = item?.clase;

        if (clase) {
          // 🔹 Render de horario ocupado
          if (activeRange === "día") {
            const fechaISO = currentDate.toISOString().slice(0, 10);
            const esPasada = new Date(`${fechaISO}T${clase.time}`) < new Date();
            const fueDictada = clase.estado === "completada";

            return (
              <div key={hora} className={`day-row ${esPasada ? "pasada" : ""}`}>
                <div className="left">
                  <input
                    type="checkbox"
                    checked={clasesSeleccionadas.includes(clase.id)}
                    onChange={(e) => {
                      const id = clase.id;
                      if (e.target.checked) {
                        setClasesSeleccionadas([...clasesSeleccionadas, id]);
                      } else {
                        setClasesSeleccionadas(
                          clasesSeleccionadas.filter((c) => c !== id)
                        );
                      }
                    }}
                  />
                  <div className="class-info">
                    <span className="student-name">{clase.student}</span>
                    <span className="circuit-name">{clase.circuit}</span>
                  </div>
                </div>
                <div className="right">
                  {fueDictada && <span className="dictada-label">✅</span>}
                  <button onClick={() => onEdit(clase)} className="edit-btn">
                    ✏️
                  </button>
                  <button
                    onClick={() => onCancel(clase.id)}
                    className="cancel-btn"
                  >
                    ❌
                  </button>
                  <span className="time-badge">{clase.time}</span>
                </div>
              </div>
            );
          }

          if (activeRange === "semana") {
            return (
              <div key={hora} className="row-mini">
                <div className="row-mini-left">
                  <span className="time-badge">{clase.time}</span>
                  <span>{clase.student}</span>
                </div>
                <div className="row-mini-right">
                  <span>{abreviarCircuito(clase.circuit)}</span>
                  <span>
                    {" "}
                    {clase.estado === "completada" ? "✅" : " "}
                  </span>{" "}
                </div>
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
                <div className="right">
                  <button onClick={() => onCrearClase(hora)}>➕ Agendar</button>
                  <span>{hora}</span>
                </div>
              </div>
            );
          }

          if (activeRange === "semana") {
            return (
              <div key={hora} className="row-free">
                <span className="rayita-verde"></span>
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

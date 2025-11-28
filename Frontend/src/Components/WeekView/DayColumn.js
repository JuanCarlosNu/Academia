import React from "react";
import "./WeekView.css";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";
import { useHorarios } from "../../Hooks/useHorarios";

function DayColumn({ dayObj, onSelectDay }) {
  const esPasada = dayObj.date < new Date(new Date().setHours(0, 0, 0, 0));

  const { cantidadOcupadas, cantidadDisponibles } = useHorarios(
    dayObj.classes,
    "día",
    HORARIOS_DEL_DIA
  );

  return (
    <div
      className={`day-col ${esPasada ? "pasada" : ""}`}
      onClick={() => onSelectDay(dayObj)}
    >
      <div className="day-header">
        <span>
          {dayObj.date.toLocaleDateString("es-AR", { weekday: "short" })}
        </span>
        <span>{dayObj.date.getDate()}</span>
      </div>

      <div className="day-metrics">
        <span className="ocupadas"> {cantidadOcupadas}</span>
        <span className="disponibles"> {cantidadDisponibles}</span>
      </div>

      {dayObj.classes.length ? (
        dayObj.classes.map((c) => {
          const fueDictada = c.estado === "completada";
          return (
            <div key={c.id} className="mini-row">
              <div className="mini-top">
                <span>{c.time}</span>
                <div className="derecha">
                  <span>{c.circuit}</span>
                  {fueDictada ? (
                    <span className="dictada-label">✅</span>
                  ) : (
                    <span className="nodictada">✅</span>
                  )}
                </div>
              </div>
              <div className="mini-student">{c.student}</div>
            </div>
          );
        })
      ) : (
        <p className="no-class">Sin clases</p>
      )}
    </div>
  );
}
export default DayColumn;

// src/pages/Clases/Clases.js
import React, { useState } from "react";
import "./Clases.css";
import DateHeader from "../Components/DateHeader/DateHeader";
import DayView from "../Components/DayView/DayView";
import WeekView from "../Components/WeekView/WeekView";
import { getWeekRange } from "../Utils/dateUtils";

function Clases() {
  const [activeRange, setActiveRange] = useState("día");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classesOfDay, setClassesOfDay] = useState([]);

  const dummyDay = [
    { id: 1, student: "María", circuit: "Circuito 2", time: "14:30" },
    { id: 2, student: "Juan", circuit: "Circuito 1", time: "16:00" },
  ];

  const dummyWeek = getDummyWeek(currentDate);

  /* ★ botón día de la semana desde WeekView */
  const handleSelectDay = (dayObj) => {
    setCurrentDate(dayObj.date);
    setClassesOfDay(dayObj.classes);
    setActiveRange("día");
  };

  /* ★ “Hoy” */
  const goToday = () => {
    setCurrentDate(new Date());
    setClassesOfDay(dummyDay);
    setActiveRange("día");
  };
  /* ★ navegar semana */

  const goPrevWeek = () => {
    const { start } = getWeekRange(currentDate);
    const prev = new Date(start);
    prev.setDate(start.getDate() - 7);
    setCurrentDate(prev);
  };

  const goNextWeek = () => {
    const { start } = getWeekRange(currentDate);
    const next = new Date(start);
    next.setDate(start.getDate() + 7);
    setCurrentDate(next);
  };
  /* ★ título variable */
  const titleLabel =
    activeRange === "semana" ? "Semana de:" : "Clases del día:";

  return (
    <div className="clases-container">
      {/* Encabezado 1 */}
      <div className="clases-header">
        <h2 className="clases-title">{titleLabel}</h2>
        <div className="view-buttons">
          {["día", "semana", "mes"].map((view) => (
            <button
              key={view}
              className={`view-button ${activeRange === view ? "active" : ""}`}
              onClick={() => setActiveRange(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Encabezado 2 */}

      <DateHeader
        currentDate={currentDate}
        activeRange={activeRange}
        onPrev={goPrevWeek}
        onNext={goNextWeek}
        onToday={goToday}
        onCancel={() => alert("Función cancelar")}
      />

      {/* Contenido dinámico */}
      {activeRange === "día" && <DayView classes={classesOfDay} />}
      {activeRange === "semana" && (
        <WeekView week={dummyWeek} onSelectDay={handleSelectDay} />
      )}
      {activeRange === "mes" && <p>Próximamente: vista mensual...</p>}
    </div>
  );
}

export default Clases;

function getDummyWeek(baseDate) {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay()); // domingo
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      date: d,
      classes:
        i % 2
          ? []
          : [{ id: i, student: "Alumno demo", circuit: "C1", time: "15:00" }],
    };
  });
}

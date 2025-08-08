// src/pages/Clases/Clases.js
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DateHeader from "../Components/DateHeader/DateHeader";
import DayView from "../Components/DayView/DayView";
import WeekView from "../Components/WeekView/WeekView";
import { getWeekRange } from "../Utils/dateUtils";
import "./Clases.css";

function Clases() {
  const [activeRange, setActiveRange] = useState("día");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classesOfDay, setClassesOfDay] = useState([]);
  const [classesOfWeek, setClassesOfWeek] = useState([]);

  const dummyDay = [
    { id: 1, student: "María", circuit: "Circuito 2", time: "14:30" },
    { id: 2, student: "Juan", circuit: "Circuito 1", time: "16:00" },
  ];

  //const dummyWeek = getDummyWeek(currentDate);

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

  useEffect(() => {
    const { start } = getWeekRange(currentDate);
    const isoInicio = start.toISOString().split("T")[0];

    axios
      .get(`/api/clases/semana?inicio=${isoInicio}`)
      .then((res) => {
        const formatted = res.data.map((dia) => ({
          date: new Date(dia.fecha),
          classes: dia.clases.map((c) => ({
            id: c._id,
            time: c.hora,
            circuit: c.circuito?.nombre || "Sin circuito",
            student:
              `${c.alumno?.nombre} ${c.alumno?.apellido}` || "Sin alumno",
          })),
        }));
        setClassesOfWeek(formatted);
      })
      .catch((err) => {
        console.error("Error al cargar semana:", err);
        setClassesOfWeek([]); // fallback vacío
      });
  }, [currentDate]);

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
        <WeekView week={classesOfWeek} onSelectDay={handleSelectDay} />
      )}
      {activeRange === "mes" && <p>Próximamente: vista mensual...</p>}
    </div>
  );
}

export default Clases;

// src/pages/Clases/Clases.js
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DateHeader from "../Components/DateHeader/DateHeader";
import DayView from "../Components/DayView/DayView";
import WeekView from "../Components/WeekView/WeekView";
import { getWeekRange } from "../Utils/dateUtils";
import "./Clases.css";
import MonthView from "../Components/MonthView/MonthView";

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

  /* ★ cargar clases de la semana al iniciar */

  useEffect(() => {
    const { start, end } = getWeekRange(currentDate);
    const isoInicio = start.toISOString().split("T")[0];
    const isoFin = end.toISOString().split("T")[0];

    console.log("Rango de semana:", isoInicio, isoFin);

    axios
      .get(
        `http://localhost:3001/api/clases/semana?desde=${isoInicio}&hasta=${isoFin}`
      )
      .then((res) => {
        const formatted = res.data.dias.map((dia) => ({
          date: new Date(dia.date),
          classes: dia.classes.map((c) => ({
            id: c.id,
            time: c.time,
            circuit: c.circuit,
            student: c.student,
            estado: c.estado,
          })),
        }));
        setClassesOfWeek(formatted);
      })
      .catch((err) => {
        console.error("Error al cargar semana:", err);
        setClassesOfWeek([]);
      });
  }, [currentDate]);

  console.log("Clases de la semana:", classesOfWeek);

  /* ★ manejar edición de clases */

  const handleEdit = (clase) => {
    // Abrir modal o redirigir a formulario de edición
    alert(`Editar clase de ${clase.student} a las ${clase.time}`);
  };

  const handleCancel = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar esta clase?")) return;

    try {
      await axios.delete(`/api/clases/${id}`);
      // Actualizar vista
      setClassesOfDay((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al cancelar clase:", err);
      alert("No se pudo cancelar la clase.");
    }
  };

  /* ★ renderizar */
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
      {activeRange === "mes" && (
        <MonthView monthData={[]} onSelectDay={handleSelectDay} />
      )}
    </div>
  );
}

export default Clases;

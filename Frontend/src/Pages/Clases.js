// src/pages/Clases/Clases.js
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DateHeader from "../Components/DateHeader/DateHeader";
import DayView from "../Components/DayView/DayView";
import WeekView from "../Components/WeekView/WeekView";
import { getWeekRange } from "../Utils/dateUtils";
import MonthView from "../Components/MonthView/MonthView";
import EditModal from "../Components/EditModal/EditModal";
import "./Clases.css";

function Clases() {
  const [activeRange, setActiveRange] = useState("día");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classesOfDay, setClassesOfDay] = useState([]);
  const [classesOfWeek, setClassesOfWeek] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (clase) => {
    setSelectedClase(clase);
    setShowModal(true);
    console.log("Clase seleccionada para editar:", selectedClase);
  };

  const handleCloseModal = () => {
    setSelectedClase(null);
    setShowModal(false);
  };

  const handleSaveEdit = async (id, data) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:3001/api/clases/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Clase actualizada:", res.data);
      setShowModal(false); // cerrar modal
    } catch (err) {
      console.error("Error al editar clase:", err);
    }
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

  /* ★ título variable o dinámico */

  const titleLabel =
    activeRange === "semana" ? "Semana de:" : "Clases del día:";

  /* ★ cargar clases de la semana al iniciar */

  useEffect(() => {
    const { start, end } = getWeekRange(currentDate);
    const isoInicio = start.toISOString().split("T")[0];
    const isoFin = end.toISOString().split("T")[0];

    console.log("Rango de semana:", isoInicio, isoFin); // es correcto

    const callWeek = `http://localhost:3001/api/clases/semana?desde=${isoInicio}&hasta=${isoFin}`;

    console.log("Llamada a la API:", callWeek); // llama correctamente

    axios
      .get(callWeek)
      .then((res) => {
        const answer = res.data;
        console.log("Respuesta de la API:", answer); // recibe la semana correctamente

        const formatted = answer.dias.map((dia) => ({
          // creo que en este almacenamiento se produce el error
          date: new Date(dia.date),
          classes: dia.classes.map((c) => ({
            id: c.id,
            time: c.time,
            circuit: c.circuit,
            student: c.student,
            estado: c.estado,
          })),
        }));
        setClassesOfWeek(formatted); // manda el array de clases de la semana
        //al state almacenado en classesOfWeek, aquí el array de la semana quda corrido un día
      })
      .catch((err) => {
        console.error("Error al cargar semana:", err);
        setClassesOfWeek([]);
      });
  }, [currentDate]); //ejecutá este bloque de código cada vez que cambie currentDate

  console.log("Clases en el estado:", classesOfWeek); // corroboro que el state se actualiza correctamente con la semana corrida un día

  /* ★ manejar edición de clases */

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

      {activeRange === "día" && (
        <DayView
          classes={classesOfDay}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />
      )}

      {activeRange === "semana" && (
        <WeekView week={classesOfWeek} onSelectDay={handleSelectDay} />
      )}

      {activeRange === "mes" && (
        <MonthView monthData={[]} onSelectDay={handleSelectDay} />
      )}

      {/*Al presionar editar se despliega el modal de edición*/}

      {showModal && (
        <EditModal
          clase={selectedClase}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default Clases;

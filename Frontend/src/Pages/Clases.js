// src/pages/Clases/Clases.js
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getWeekRange, normalizeDateLocal } from "../Utils/dateUtils";
import DateHeader from "../Components/DateHeader/DateHeader";
import DayView from "../Components/DayView/DayView";
import WeekView from "../Components/WeekView/WeekView";
import MonthView from "../Components/MonthView/MonthView";
import EditModal from "../Components/EditModal/EditModal";
import CreateModal from "../Components/CreateModal/CreateModal";
import "./Clases.css";

/* ★ URL de la API según entorno  */

export const API_URL =
  process.env.REACT_APP_BACKEND_URL_RENDER ||
  process.env.REACT_APP_BACKEND_URL_RAILWAY ||
  "http://localhost:3001";

function Clases() {
  const [activeRange, setActiveRange] = useState("semana");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classesOfDay, setClassesOfDay] = useState([]);
  const [classesOfWeek, setClassesOfWeek] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateClase = () => {
    setShowCreateModal(true); // abre el modal de creación.
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleClaseCreada = () => {
    //  Recargar la semana actual o el día actual según el rango activo

    if (activeRange === "semana") {
      // Reutilizá el efecto que carga la semana
      setCurrentDate(new Date(currentDate)); // fuerza el efecto
    } else if (activeRange === "día") {
      // Recargar el día actual

      goToday();
    }
  };

  const handleEdit = (clase) => {
    setSelectedClase(clase);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedClase(null);
    setShowEditModal(false);
  };

  /* ★ manejar edición de clases */
  const actualizarDiaTrasEdicion = (claseEditada, clasesDia) => {
    return clasesDia.map((c) => (c.id === claseEditada.id ? claseEditada : c));
  };
  const actualizarSemanaTrasEdicion = (claseEditada, clasesSemana) => {
    return clasesSemana.map((dia) => ({
      ...dia,
      classes: dia.classes.map((c) =>
        c.id === claseEditada.id ? claseEditada : c
      ),
    }));
  };

  const handleSaveEdit = async (id, data) => {
    console.log("ID recibido para editar:", id);
    console.log("Datos recibidos:", data);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(`${API_URL}/api/clases/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualizar vista
      console.log("dia antes de editar", classesOfDay);

      const claseNormalizada = {
        id: res.data.id || res.data._id,
        student: res.data.alumno?.nombre || "Sin nombre",
        circuit: res.data.circuito?.nombre || "Sin circuito",
        time: res.data.hora,
        estado: res.data.estado,
        alumnoId: res.data.alumno?._id,
      };

      setClassesOfWeek((prev) =>
        actualizarSemanaTrasEdicion(claseNormalizada, prev)
      );

      setClassesOfDay((prev) =>
        actualizarDiaTrasEdicion(claseNormalizada, prev)
      );

      console.log("Clase actualizada:", claseNormalizada);
      console.log("Actualización día:", classesOfDay);
      setShowEditModal(false); // cerrar modal
    } catch (err) {
      console.error("Error al editar clase:", err);
    }
  };

  /* ★ manejar cancelación de clases */
  const actualizarSemanaTrasCancelación = (idClase, clasesSemana) => {
    return clasesSemana.map((dia) => ({
      ...dia,
      classes: dia.classes.filter((clase) => clase.id !== idClase),
    }));
  };

  const handleCancel = async (id) => {
    if (!window.confirm("¿Seguro que querés cancelar esta clase?")) return;

    try {
      await axios.delete(`${API_URL}/api/clases/${id}`);

      // Actualizar vista

      setClassesOfWeek((prev) => actualizarSemanaTrasCancelación(id, prev));
      setClassesOfDay((prev) => prev.filter((c) => c.id !== id));
      console.log("Clase cancelada:", id);
      console.log("Actualización semana:", classesOfWeek);
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

  /* ★ botón día de la semana desde WeekView forma el dayObj */

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

  /* ★ cargar clases de la semana Actual al iniciar */

  useEffect(() => {
    const { start, end } = getWeekRange(currentDate);
    const isoInicio = start.toISOString().split("T")[0];
    const isoFin = end.toISOString().split("T")[0];

    const callWeek = `${API_URL}/api/clases/semana?desde=${isoInicio}&hasta=${isoFin}`;

    console.log("Llamada a la API:", callWeek); // llama correctamente

    axios
      .get(callWeek)
      .then((res) => {
        const answer = res.data;
        console.log("Respuesta de la API:", answer); // recibe la semana correctamente
        /* devuelve una objeto así: {rango: {…}, dias: Array(7)}
        por eso se accede a los días así: "answer.dias" que es un objeto así:
        {date: '2025-08-24T00:00:00.000Z', classes: Array(2)}
        Entonces hay que mapear los días y las clases de cada día
        */
        //aquí mapeo los días
        const formatted = answer.dias.map((dia) => {
          const fechaNormalizada = normalizeDateLocal(dia.date);
          /*console.log(
            "Fecha original:",
            dia.date,
            "→ Fecha normalizada:",
            fechaNormalizada,
            "→ Día:",
            fechaNormalizada.getDay()
          );*/

          return {
            date: fechaNormalizada,
            //aqui mapeo las clases del día
            classes: dia.classes.map((c) => ({
              id: c.id,
              time: c.time,
              circuit: c.circuitId,
              student: c.student,
              alumnoId: c.alumnoId,
              estado: c.estado,
            })),
          };
        });
        setClassesOfWeek(formatted); // manda el array de dias y clases
        // {date: Sun Aug 24 2025 (hora estándar de Argentina), classes: Array(0)} de la semana
        //al state almacenado en classesOfWeek.
      })
      .catch((err) => {
        console.error("Error al cargar semana:", err);
        setClassesOfWeek([]);
      });
  }, [currentDate]); //ejecutá este bloque de código cada vez que cambie currentDate

  console.log("días en el estado:", classesOfWeek); // corroboro que el state se actualiza correctamente con la semana corrida un día

  /* verificar si se ha seleccionado una clase y mostrarla en consola cuando el usuario
  hace click en ✏️*/

  useEffect(() => {
    if (selectedClase) {
      console.log("Clase seleccionada actualizada:", selectedClase);
    }
  }, [selectedClase]);

  /* ★ renderizar */
  return (
    <div className="clases-container">
      Encabezado 1{/* Encabezado 1 */}
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
      Encabezado 2{/* Encabezado 2 */}
      <DateHeader
        currentDate={currentDate}
        activeRange={activeRange}
        onPrev={goPrevWeek}
        onNext={goNextWeek}
        onToday={goToday}
        onCancel={() => alert("Función cancelar")}
        onCreate={handleCreateClase}
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
      {showEditModal && (
        <EditModal
          clase={selectedClase}
          currentDate={currentDate}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
      {showCreateModal && (
        <CreateModal
          onClose={handleCloseCreateModal}
          onCreate={handleClaseCreada}
        />
      )}
    </div>
  );
}

export default Clases;

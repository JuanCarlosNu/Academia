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
import { HORARIOS_DEL_DIA } from "../Utils/horarios";
import { construirDiaCompleto } from "../Utils/horarios";
import "./Clases.css";

/* ★ URL de la API según entorno  */

export const API_URL =
  process.env.REACT_APP_BACKEND_URL_RENDER ||
  process.env.REACT_APP_BACKEND_URL_RAILWAY ||
  "http://localhost:3001";

function Clases() {
  const [activeRange, setActiveRange] = useState("semana");
  const [currentDate, setCurrentDate] = useState(new Date()); // currentDate es la fecha mostrada en el encabezado y usada para cargar datos, comienza siendo el día de la fecha
  const [classesOfDay, setClassesOfDay] = useState([]);
  const [classesOfWeek, setClassesOfWeek] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [claseNueva, setClaseNueva] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateClase = () => {
    setShowCreateModal(true); // abre el modal de creación.
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false); // Cierra el modal de creación.
  };

  const handleClaseCreada = () => {
    //  Recargar la semana actual o el día actual según el rango activo

    if (activeRange === "semana") {
      // Reutilizá el efecto que carga la semana
      setCurrentDate(new Date(currentDate)); // fuerza el efecto
      console.log("Currente day es ahora: ", currentDate);
    } else if (activeRange === "día") {
      setCurrentDate(new Date(currentDate));
      // Recargar el día actual
      console.log("semana actualizada tras creación de clase", classesOfWeek);
      //setActiveRange("semana");
      console.log("clase nueva", claseNueva);
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

  /* ★ botón día de la semana desde WeekView forma el dayObj */

  const handleSelectDay = (dayObj) => {
    const diaCompleto = construirDiaCompleto(dayObj.classes);
    setCurrentDate(dayObj.date); // currentDate cambia y pasa a ser la fecha seleccionada.
    setClassesOfDay(diaCompleto);
    setActiveRange("día");
    console.log("CurrentDate es:", dayObj.date);
  };

  /* ★ crear clase desde la grilla horaria de DayView con el correspondiente horario prefijado*/
  const handleCrearClase = (hora) => {
    console.log("Clase a enviar:", claseNueva);
    setClaseNueva({ time: hora, date: currentDate }); // podés guardar más datos si querés
    setShowCreateModal(true);
  };

  /* ★ “Hoy” */

  const goToday = () => {
    setCurrentDate(new Date()); // establece currentDate al día de hoy
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
    activeRange === "semana"
      ? "Semana de:"
      : activeRange === "mes"
      ? "Clases del mes:"
      : "Clases del día:";

  /* ★ cargar clases de la semana Actual al iniciar */

  useEffect(() => {
    console.log("Cargando semana para fecha:", currentDate);

    //obtengo inicio y fin de semana a partir del día actual
    const { start, end } = getWeekRange(currentDate);
    const isoInicio = start.toISOString().split("T")[0];
    const isoFin = end.toISOString().split("T")[0];

    // construyo la llamada a la API para ese período

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
              circuit: c.circuit || "Sin circuito",
              student: c.student,
              alumnoId: c.alumnoId,
              estado: c.estado,
              profesor: c.profesor,
              profesorId: c.profesorId,
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

  useEffect(() => {
    const diaActual = classesOfWeek.find(
      (d) =>
        d.date.toISOString().split("T")[0] ===
        currentDate.toISOString().split("T")[0]
    );

    if (diaActual) {
      const diaCompleto = construirDiaCompleto(diaActual.classes);
      setClassesOfDay(diaCompleto);
    }
  }, [classesOfWeek, currentDate]);

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
          activeRange={activeRange}
          classes={classesOfDay}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onCrearClase={handleCrearClase}
          currentDate={currentDate}
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
          activeRange={activeRange}
          claseNueva={claseNueva}
          setClaseNueva={setClaseNueva}
          onClose={handleCloseCreateModal}
          onCreate={handleClaseCreada}
          classesOfDay={classesOfDay}
        />
      )}
    </div>
  );
}

export default Clases;

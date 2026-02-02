// src/components/DayView.js
import React, { useState } from "react";
import { useHorarios } from "../../Hooks/useHorarios";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";
import DaySchedule from "../DaySchedule/DaySchedule";
import "./DayView.css";

function DayView({
  classes,
  profesores,
  onEdit,
  onCancel,
  onCrearClase,
  currentDate,
  activeRange,
}) {
  const [clasesSeleccionadas, setClasesSeleccionadas] = useState([]);
  const [filtroProfesor, setFiltroProfesor] = useState("");
  const [filtroCircuito, setFiltroCircuito] = useState("");
  //classes viene del estado en clases.js clasesOfDay
  console.log("DayView recived classes:", classes);

  const { cantidadOcupadas, cantidadDisponibles } = useHorarios(
    classes,
    "día",
    HORARIOS_DEL_DIA,
  );
  // Generar espacios libres para todos los horarios
  const generarEspaciosLibres = () =>
    HORARIOS_DEL_DIA.map((hora) => ({
      hora,
      clase: null,
    }));

  // Filtrado de clases
  const filteredClasses = (() => {
    if (!filtroProfesor && !filtroCircuito) return classes;

    const clasesFiltradas = classes.filter(({ clase }) => {
      if (!clase) return true; // mostrar espacios libres
      const coincideProfesor =
        !filtroProfesor || clase.profesor === filtroProfesor;
      const coincideCircuito =
        !filtroCircuito || clase.circuit === filtroCircuito;
      return coincideProfesor && coincideCircuito;
    });

    // Si se filtró por profesor y no tiene clases → devolver todos libres
    if (filtroProfesor && clasesFiltradas.length === 0) {
      return generarEspaciosLibres();
    }

    return clasesFiltradas;
  })();

  //mapea cada clase y muestra alumno circuito y hora, depués de filtrar
  //además muestra botones/editar

  return (
    <div className="day-view">
      <div className="filtros-dia">
        <label>Filtrar por profesor:</label>

        {/*Mapea profesores y toma el nombre único*/}
        <select
          value={filtroProfesor} //estado del filtro
          onChange={(e) => setFiltroProfesor(e.target.value)}
        >
          <option value="">Todos</option>
          {profesores.map((p) => (
            <option key={p._id} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
        <label>Filtrar por circuito:</label>

        {/*Mapea circuitos y toma el nombre único*/}

        <select
          value={filtroCircuito} //estado del filtro
          onChange={(e) => setFiltroCircuito(e.target.value)}
        >
          <option value="">Todos</option>
          {[...new Set(classes.map((c) => c.clase?.circuit))] // nombres únicos
            .filter(Boolean)
            .map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
        </select>
        {/* Muestra ocupación del día */}
        <div className="ocupación-dia">
          <span className="ocupadas">{cantidadOcupadas}</span>
          <span className="disponibles">{cantidadDisponibles}</span>
        </div>
      </div>

      <DaySchedule
        classes={filteredClasses}
        currentDate={currentDate}
        activeRange={activeRange}
        onEdit={onEdit}
        onCancel={onCancel}
        onCrearClase={onCrearClase}
        clasesSeleccionadas={clasesSeleccionadas}
        setClasesSeleccionadas={setClasesSeleccionadas}
      />

      {clasesSeleccionadas.length > 0 && (
        <div className="cancel-multiple">
          <p>{clasesSeleccionadas.length} clase(s) seleccionada(s)</p>
          <button
            onClick={() => {
              const confirmar = window.confirm(
                `¿Seguro que desea cancelar ${clasesSeleccionadas.length} clases?`,
              );
              if (!confirmar) return;

              clasesSeleccionadas.forEach((id) => onCancel(id));
              setClasesSeleccionadas([]);
            }}
          >
            Cancelar clases seleccionadas
          </button>
        </div>
      )}
    </div>
  );
}

export default DayView;

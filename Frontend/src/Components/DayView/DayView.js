// src/components/DayView.js
import React from "react";
import { useState } from "react";
import "./DayView.css";
import { useHorarios } from "../../Hooks/useHorarios";
import { HORARIOS_DEL_DIA } from "../../Utils/horarios";

function DayView({
  classes,
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
  console.log("Recibiendo clases en DayView:", classes);

  const { cantidadOcupadas, cantidadDisponibles } = useHorarios(
    classes,
    "día",
    HORARIOS_DEL_DIA
  );
  console.log("Cantidad ocupadas:", cantidadOcupadas);
  console.log("Cantidad disponibles:", cantidadDisponibles);

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
          {[...new Set(classes.map((c) => c.clase?.profesor))] // nombres únicos
            .filter(Boolean)
            .map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
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

      {classes
        .filter(({ clase }) => {
          if (!clase) return true; // mostrar espacios libres

          // se fija si coinciden los filtros
          const coincideProfesor =
            !filtroProfesor || clase.profesor === filtroProfesor;
          const coincideCircuito =
            !filtroCircuito || clase.circuit === filtroCircuito;

          // devuelve lo correspondiente
          return coincideProfesor && coincideCircuito;
        })
        .map(({ time, clase }) => {
          //Mira la fecha de hoy.
          const fechaISO = currentDate.toISOString().slice(0, 10); // "2025-11-10"

          // Verifica si la clase es pasada
          const esPasada =
            clase && new Date(`${fechaISO}T${clase.time}`) < new Date();
          //Verifica si la clase fue dictada
          const fueDictada = clase?.estado === "completada";
          // Verifica si el horario está ocupado
          const ocupada = clase !== null;

          console.log("cantidad clases:", ocupada);

          return (
            <div key={time} className={`day-row ${esPasada ? "pasada" : ""}`}>
              {clase ? (
                <>
                  <div>
                    {/* Checkbox para seleccionar clase */}
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

                    <p className="student">{clase.student}</p>
                    <p className="circuit">{clase.circuit}</p>
                  </div>

                  <div className="right">
                    {/*indica si la clase ya ha sido dictado renderizando un tick*/}
                    {fueDictada && <span className="dictada-label">✅ </span>}

                    {/* Editar clase: onEdit() está en clases.js llama a handleEdit-> Almacena c
            en selectedClase y muestra el modal */}
                    <button
                      onClick={() => {
                        console.log(
                          "Clase enviada a editar desde DayView:",
                          clase
                        );
                        onEdit(clase);
                      }}
                      className="edit-btn"
                    >
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
                </>
              ) : (
                <div className="empty-slot">
                  {console.log("estamos en la vista :", activeRange)}
                  <p>Espacio libre</p>
                  <div className="right">
                    <button onClick={() => onCrearClase(time)}>
                      ➕ Agendar
                    </button>{" "}
                    <span className="time-badge-empty">{time}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {clasesSeleccionadas.length > 0 && (
        <div className="cancel-multiple">
          <p>{clasesSeleccionadas.length} clase(s) seleccionada(s)</p>
          <button
            onClick={() => {
              const confirmar = window.confirm(
                `¿Seguro que desea cancelar ${clasesSeleccionadas.length} clases?`
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

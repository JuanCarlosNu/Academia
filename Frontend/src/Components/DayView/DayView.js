// src/components/DayView.js
import React from "react";
import { useState } from "react";
import "./DayView.css";

function DayView({ classes, onEdit, onCancel, onCrearClase }) {
  const [clasesSeleccionadas, setClasesSeleccionadas] = useState([]);
  //classes viene del estado en clases clasesOfDay
  console.log("Recibiendo clases en DayView:", classes);

  if (!classes.length) {
    return <p className="empty-msg">No hay clases programadas para este día</p>;
  }

  //mapea cada clase y muestra alumno circuito y hora, ademas botones para editar y cancelar.
  return (
    <div className="day-view">
      {classes.map(({ time, clase }) => (
        <div key={time} className="day-row">
          {clase ? (
            <>
              <div>
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
                {/* Editar clase: onEdit() está en clases.js llama a handleEdit-> Almacena c
            en selectedClase y muestra el modal */}
                <button
                  onClick={() => {
                    console.log("Clase enviada a editar desde DayView:", clase);
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
              <p>Espacio libre</p>
              <div className="right">
                <button onClick={() => onCrearClase(time)}>➕ Agendar</button>{" "}
                <span className="time-badge-empty">{time}</span>
              </div>
            </div>
          )}
        </div>
      ))}
      {clasesSeleccionadas.length > 0 && (
        <div className="cancel-multiple">
          <p>{clasesSeleccionadas.length} clase(s) seleccionada(s)</p>
          <button
            onClick={() => {
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

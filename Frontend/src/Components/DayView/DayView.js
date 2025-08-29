// src/components/DayView.js
import React from "react";
import "./DayView.css";

function DayView({ classes, onEdit, onCancel }) {
  //classes viene del estado en clases clasesOfDay
  console.log("Recibiendo clases en DayView:", classes);

  if (!classes.length) {
    return <p className="empty-msg">No hay clases programadas para este día</p>;
  }
  //mapea cada clase y muestra alumno circuito y hora, ademas botones para editar y cancelar.
  return (
    <div className="day-view">
      {classes.map((c) => (
        <div key={c.id} className="day-row">
          <div>
            <p className="student">{c.student}</p>
            <p className="circuit">{c.circuit}</p>
          </div>

          <div className="right">
            {/* Editar clase: onEdit() está en clases.js llama a handleEdit-> Almacena c
            en selectedClase y muestra el modal */}
            <button
              onClick={() => {
                console.log("Clase enviada a editar desde DayView:", c);
                onEdit(c);
              }}
              className="edit-btn"
            >
              ✏️
            </button>
            <button onClick={() => onCancel(c.id)} className="cancel-btn">
              ❌
            </button>
            <span className="time-badge">{c.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DayView;

// src/components/DayView.js
import React from "react";
import "./DayView.css";

function DayView({ classes, handleEdit, handleCancel }) {
  if (!classes.length) {
    return <p className="empty-msg">No hay clases programadas para este día</p>;
  }

  return (
    <div className="day-view">
      {classes.map((c) => (
        <div key={c.id} className="day-row">
          <div>
            <p className="student">{c.student}</p>
            <p className="circuit">{c.circuit}</p>
          </div>

          <div className="right">
            <button onClick={() => handleEdit(c)} className="edit-btn">
              ✏️
            </button>
            <button onClick={() => handleCancel(c.id)}>❌</button>

            <span className="time-badge">{c.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DayView;

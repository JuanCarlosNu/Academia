// src/components/DateHeader.js
import React from "react";
import "./DateHeader.css";

function DateHeader({ currentDate, onToday, onCancel }) {
  const longDate = currentDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="date-header">
      <div className="date-header-top">{longDate}</div>

      <div className="date-header-bottom">
        <button className="action-btn" onClick={onToday}>
          Hoy
        </button>
        <button className="action-btn cancel" onClick={onCancel}>
          Cancelar clases
        </button>
      </div>
    </div>
  );
}

export default DateHeader;

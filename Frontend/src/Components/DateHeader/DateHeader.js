// src/components/DateHeader.js
import React from "react";
import "./DateHeader.css";
import { formatShort, getWeekRange } from "../../Utils/dateUtils";

function DateHeader({
  currentDate,
  onToday,
  onCancel,
  onCreate,
  activeRange,
  onPrev,
  onNext,
  onPrevMonth,
  onNextMonth,
}) {
  const longDate = currentDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let topText = currentDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (activeRange === "semana") {
    const { start, end } = getWeekRange(currentDate);
    topText = `${formatShort(start)} - ${formatShort(end)}`;
  }
  if (activeRange === "mes") {
    topText = currentDate.toLocaleDateString("es-AR", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="date-shown">
      <h2 className="date-header-top">
        {activeRange === "semana" && (
          <button className="nav-arrow" onClick={onPrev}>
            ‹
          </button>
        )}
        {activeRange === "mes" && (
          <button className="nav-arrow" onClick={onPrevMonth}>
            ‹
          </button>
        )}
        {topText}
        {activeRange === "semana" && (
          <button className="nav-arrow" onClick={onNext}>
            ›
          </button>
        )}
        {activeRange === "mes" && (
          <button className="nav-arrow" onClick={onNextMonth}>
            ›
          </button>
        )}
      </h2>

      <div className="date-header-bottom">
        <button className="action-btn" onClick={onToday}>
          Hoy
        </button>
        <button className="action-btn cancel" onClick={onCancel}>
          Cancelar clases
        </button>
        <button className="action-btn create" onClick={onCreate}>
          Crear clase
        </button>
      </div>
    </div>
  );
}

export default DateHeader;

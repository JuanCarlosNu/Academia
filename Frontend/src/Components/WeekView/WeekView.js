// src/components/WeekView.js
import React from "react";
import "./WeekView.css";
import { construirDiaCompleto } from "../../Utils/horarios";
import DaySchedule from "../DaySchedule/DaySchedule";

function WeekView({ week, onSelectDay }) {
  return (
    <div className="week-grid">
      {week.map((dayObj) => {
        const slots = construirDiaCompleto(dayObj.classes); // ← [{ time, clase }]
        return (
          <div
            key={dayObj.date.toISOString()}
            className="day-col-wrapper"
            onClick={() => onSelectDay(dayObj)}
          >
            <div className="day-header">
              <span>
                {dayObj.date.toLocaleDateString("es-AR", { weekday: "short" })}
              </span>
              <span>{dayObj.date.getDate()}</span>
            </div>

            <DaySchedule
              classes={slots}
              currentDate={dayObj.date}
              activeRange="semana"
              onEdit={() => {}}
              onCancel={() => {}}
              onCrearClase={() => {}}
            />
          </div>
        );
      })}
    </div>
  );
}

export default WeekView;

// src/components/WeekView.js
import React from "react";
import "./WeekView.css";

function WeekView({ week, onSelectDay }) {
  return (
    <div className="week-grid">
      {week.map((dayObj) => (
        <div
          key={dayObj.date}
          className="day-col"
          onClick={() => onSelectDay(dayObj.date)}
        >
          <div className="day-header">
            <span>
              {dayObj.date.toLocaleDateString("es-AR", { weekday: "short" })}
            </span>
            <span>{dayObj.date.getDate()}</span>
          </div>

          {dayObj.classes.length ? (
            dayObj.classes.map((c) => (
              <div key={c.id} className="mini-row">
                <div className="mini-top">
                  <span>{c.time}</span>
                  <span>{c.circuit}</span>
                </div>
                <div className="mini-student">{c.student}</div>
              </div>
            ))
          ) : (
            <p className="no-class">Sin clases</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default WeekView;

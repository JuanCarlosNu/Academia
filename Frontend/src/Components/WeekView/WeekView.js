// src/components/WeekView.js
import React from "react";
import "./WeekView.css";
import DayColumn from "./DayColumn";

function WeekView({ week, onSelectDay }) {
  return (
    <div className="week-grid">
      {week.map(
        (
          dayObj //aquí nace el objeto dayObj
        ) => (
          <DayColumn
            key={dayObj.date.toISOString()}
            dayObj={dayObj}
            onSelectDay={onSelectDay}
          />
        )
      )}
    </div>
  );
}

export default WeekView;

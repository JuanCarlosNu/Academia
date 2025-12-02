import React from "react";
import "./MonthView.css";
import DayColumn from "../WeekView/DayColumn";

function MonthView({ monthData, onSelectDay }) {
  console.log("MonthView received monthData:", monthData);
  return (
    <div className="week-grid">
      {monthData.map(
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
export default MonthView;

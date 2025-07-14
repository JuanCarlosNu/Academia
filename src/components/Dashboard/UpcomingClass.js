// src/components/UpcomingClass.js
import React from "react";
import "./UpcomingClass.css";

function UpcomingClass() {
  const data = [
    {
      name: "María González",
      circuit: "Circuito 2",
      time: "Hoy, 14:30",
      teacher: "Prof. Martínez",
    },
    {
      name: "Juan Pérez",
      circuit: "Circuito 1",
      time: "Mañana, 10:00",
      teacher: "Prof. García",
    },
    {
      name: "Carlos Rodríguez",
      circuit: "Circuito 3",
      time: "Mañana, 16:15",
      teacher: "Prof. López",
    },
  ];

  return (
    <div className="box">
      <div className="box-header">Próximas Clases</div>
      <div className="box-content">
        {data.map((item, index) => (
          <div key={index} className="row">
            <div>
              <p className="name">{item.name}</p>
              <p className="subtext">{item.circuit}</p>
            </div>
            <div className="text-right">
              <p className="name">{item.time}</p>
              <p className="subtext">{item.teacher}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingClass;

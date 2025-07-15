// src/components/FewClassesLeft.js
import React from "react";
import "../UpcomingBoxes.css"; // Reutilizamos el mismo CSS

function FewClassesLeft() {
  const data = [
    {
      name: "Ana Martínez",
      circuit: "Circuito 1",
      remaining: "1 clase",
      color: "red",
    },
    {
      name: "Luis Sánchez",
      circuit: "Circuito 2",
      remaining: "2 clases",
      color: "orange",
    },
    {
      name: "Elena Gómez",
      circuit: "Circuito 3",
      remaining: "3 clases",
      color: "orange",
    },
  ];

  return (
    <div className="box">
      <div className="box-header">Alumnos con Pocas Clases Restantes</div>
      <div className="box-content">
        {data.map((item, index) => (
          <div key={index} className="row">
            <div>
              <p className="name">{item.name}</p>
              <p className="subtext">{item.circuit}</p>
            </div>
            <div className="text-right">
              <p className="name" style={{ color: item.color }}>
                {item.remaining}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FewClassesLeft;

// src/pages/Clases.js
import React, { useState } from "react";
import "./Clases.css";

function Clases() {
  const [activeView, setActiveView] = useState("día");

  return (
    <div className="clases-container">
      <div className="clases-header">
        <h2 className="clases-title">Clases del día:</h2>
        <div className="view-buttons">
          {["día", "semana", "mes"].map((view) => (
            <button
              key={view}
              className={`view-button ${activeView === view ? "active" : ""}`}
              onClick={() => setActiveView(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Aquí irá el contenido de la vista elegida */}
      <div className="clases-content">
        {/* Por ejemplo: lista de clases del día */}
        <p>
          Contenido para vista: <strong>{activeView}</strong>
        </p>
      </div>
    </div>
  );
}

export default Clases;

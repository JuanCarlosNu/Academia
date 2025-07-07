import React from "react";
import StatCard from "../Components/Dashboard/StatCard";
import "./Dashboard.css";

function DashBoard() {
  return (
    <div className="dashboard-container">
      <div className="stat-grid">
        <StatCard title="Alumnos" total="120" detail="+8 este mes" icon="♠️" />
        <StatCard
          title="Clases Programadas"
          total="45"
          detail="+5 este mes"
          icon="👥"
        />
        <StatCard
          title="Profesores"
          total="10"
          detail="+1 este mes"
          icon="🛒"
        />
        <StatCard title="Circuitos" total="5" detail="Sin cambios" icon="🪃" />
      </div>
    </div>
  );
}

export default DashBoard;

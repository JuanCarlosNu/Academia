import React from "react";
import "./StatCard.css";

function StatCard({ title, total, detail, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h3>{title}</h3>
        <span className="stat-icon">{icon}</span>
      </div>
      <h1 className="Total">{total}</h1>
      <p className="detail">{detail}</p>
    </div>
  );
}
export default StatCard;

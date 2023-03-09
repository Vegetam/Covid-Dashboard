import React from "react";

const SummaryCard = ({ title, value, flagUrl }) => {
  return (
    <div className="summary-card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        <span className="card-value">{value}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
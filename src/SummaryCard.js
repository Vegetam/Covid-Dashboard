import React from "react";
import PropTypes from "prop-types";
import "./SummaryCard.css";

function SummaryCard({ label, value, icon, color }) {
  return (
    <div className="summary-card" style={{ backgroundColor: color }}>
      <div className="summary-card-icon">{icon}</div>
      <div className="summary-card-content">
        <div className="summary-card-label">{label}</div>
        <div className="summary-card-value">{value}</div>
      </div>
    </div>
  );
}

SummaryCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element,
  color: PropTypes.string.isRequired,
};

SummaryCard.defaultProps = {
  icon: null,
};

export default SummaryCard;

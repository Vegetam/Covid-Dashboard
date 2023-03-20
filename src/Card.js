import React from "react";
import PropTypes from "prop-types";
import "./SummaryCard.css";

function Card({ label, value }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Card;
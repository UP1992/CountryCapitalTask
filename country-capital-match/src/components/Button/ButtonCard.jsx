import React from "react";

function ButtonCard({ label, onClick, border }) {
  return (
    <button
      className="pair-btn"
      onClick={onClick}
      style={{ border }}
    >
      {label}
    </button>
  );
}

export default ButtonCard;

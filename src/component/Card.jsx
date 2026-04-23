import React from 'react'

// -------------------- CARD --------------------
const Card = ({ title, value, status }) => {
  const statusColor = {
    proceed: "bg-validation",
    monitor: "bg-intelligence",
    risk: "bg-risk",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="text-sm text-system">{title}</h3>
      <p className="text-xl font-semibold text-content">{value}</p>
      <span
        className={`text-xs text-white px-2 py-1 rounded mt-2 inline-block ${statusColor[status]}`}
      >
        {status}
      </span>
    </div>
  );
};


export default Card
// TotalBudget.js
import React from 'react';
import './TotalBudget.css';

const TotalBudget = ({ allocated, remaining }) => {
  const percentageRemaining = (remaining / allocated) * 100;

  return (
    <div className="total-budget-container">
      <div className="total-heading">Total</div>
      <div className="budget-figures">
        <span className="allocated">Allocated: ${allocated.toFixed(2)}</span>
        <span className="remaining">Remaining: ${remaining.toFixed(2)}</span>
      </div>
      <div className="progress-bar-background">
        <div className="progress-bar" style={{ width: `${percentageRemaining}%` }}></div>
      </div>
    </div>
  );
};

export default TotalBudget;


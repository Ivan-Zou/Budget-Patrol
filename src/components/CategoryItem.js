// CategoryItem.jsx
import React from 'react';
import './CategoryItem.css'; // Assume styling specific to the category item is here

const CategoryItem = ({ name, allocated, remaining, icon }) => {
  // Calculate the percentage remaining for the progress bar
  const percentageRemaining = (remaining / allocated) * 100;

  return (
    <div className="category-item">
      <span className="icon" role="img" aria-label={name}>{icon}</span>
      <div className="category-content">
        <span className="category-name">{name}</span>
        <div className="budget-details">
          <span className="allocated">Allocated: ${allocated.toFixed(2)}</span>
          <span className="remaining">Remaining: ${remaining.toFixed(2)}</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentageRemaining}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;



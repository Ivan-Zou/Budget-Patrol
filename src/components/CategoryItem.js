import React, { useState } from 'react';
import './CategoryItem.css'; // Assume styling specific to the category item is here


const CategoryItem = ({ name, allocated: initialAllocated, remaining: initialRemaining, icon }) => {
 const [allocated, setAllocated] = useState(initialAllocated);
 const [remaining, setRemaining] = useState(initialRemaining);


 // Calculate the percentage remaining for the progress bar
 const percentageRemaining = (remaining / allocated) * 100;


 // Handle changes to allocated and remaining inputs
 const handleAllocatedChange = (event) => {
   const value = parseFloat(event.target.value);
   if (!isNaN(value)) {
     setAllocated(value);
   } else {
     setAllocated(null);
   }
 };


 const handleRemainingChange = (event) => {
   const value = parseFloat(event.target.value);
   if (!isNaN(value)) {
     setRemaining(value);
   } else {
     setRemaining(null);
   }
 };


 return (
   <div className="category-item">
     <span className="icon" role="img" aria-label={name}>{icon}</span>
     <div className="category-content">
       <span className="category-name">{name}</span>
       <div className="budget-details">
         <label className="allocated">
           Allocated: $
           <input
             type="number"
             value={allocated}
             onChange={handleAllocatedChange}
             style={{ width: '100px', marginLeft: '5px' }}
           />
         </label>
         <label className="remaining">
           Remaining: $
           <input
             type="number"
             value={remaining}
             onChange={handleRemainingChange}
             style={{ width: '100px', marginLeft: '5px' }}
           />
         </label>
       </div>
       <div className="progress-bar-container">
         <div className="progress-bar" style={{ width: `${percentageRemaining}%` }}></div>
       </div>
     </div>
   </div>
 );
};


export default CategoryItem;
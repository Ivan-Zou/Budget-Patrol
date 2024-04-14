import React, { useState } from 'react';
import '../components/SettingsTab.css'; // Import the CSS styles


function SettingsTab() {


   // Budget period
   const [period, setPeriod] = useState("Weekly");
   const [tempPeriod, setTempPeriod] = useState("Weekly");
   // For dropdown menu
   const [isOpen, setIsOpen] = useState(false);


   // Max possible allocation per category
   const [max, setMax] = useState(1000.00);
   const [tempMax, setTempMax] = useState(1000.00);


   const toggleMenu = () => {
       setIsOpen(!isOpen);
   };
  
   const handleNewPeriod = (selectedPeriod) => {
       setTempPeriod(selectedPeriod);
       setIsOpen(false);
   };


   const handleNewAmt = (event) => {
       const value = parseFloat(event.target.value);
       if (!isNaN(value)) {
            setTempMax(value);
       } else {
            setTempMax(null);
       }
   };


   const confirmAll = () => {
       setPeriod(tempPeriod);
       setMax(tempMax);
   };


   return (
      
       <div className="settings-tab">
            <div className = "header">
                <h2>Settings</h2>
            </div>
           <div className = "settings-items">
               <div className="setting-item">
                   <h4>Set Budgeting Period</h4>
                   <button className="dropdown-toggle" onClick={toggleMenu}>
                           {tempPeriod} <span className="caret">&#9660;</span>
                       </button>
                       {isOpen && (
                           <ul className="dropdown-menu">
                               <li onClick={() => handleNewPeriod("Weekly")}>Weekly</li>
                               <li onClick={() => handleNewPeriod("Monthly")}>Monthly</li>
                               <li onClick={() => handleNewPeriod("Yearly")}>Yearly</li>
                           </ul>
                       )}
               </div>
               <div className="setting-item">
                   <h4>Set Max Budget</h4>
                   <input
                       type="number"
                       value={tempMax}
                       onChange={handleNewAmt}
                       className="max-budget-input"
                       placeholder="Enter Max Budget"
                   />
               </div>
           </div>
           <h4>Confirm Changes</h4>
           <button className="btn-confirm" onClick={confirmAll}>Submit</button>
       </div>
   );
}


export default SettingsTab;

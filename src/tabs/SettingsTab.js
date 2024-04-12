import React, { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';

function SettingsTab() {

    //budget period
    const [period, setPeriod] = useState("Weekly");
    const [tempPeriod, setTempPeriod] = useState("Weekly");
    //for dropdown menu
    const [isOpen, setIsOpen] = useState(false);

    //max possible allocation per category
    const [max, setMax] = useState(1000.00);
    const [tempMax, setTempMax] = useState(1000.00);
    

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const handleNewPeriod = (period) => {
        setTempPeriod(period);
        setIsOpen(false);
    };

    const handleNewAmt = (event) => {
        setTempMax(event.target.value);
    }

    const confirmAll = () => {
        setPeriod(tempPeriod);
        setMax(tempMax);
    }

    const revertAll = () => {
        setTempPeriod(period);
        setTempMax(max);
    }

    


    return (
        <div>
            <h3>Settings</h3>
            
            <div className="dropdown">
                <h4>Set Budgeting Period</h4>
                <Dropdown 
                    options={[
                        { value: "Weekly", label: "Weekly" },
                        { value: "Monthly", label: "Monthly" },
                        { value: "Yearly", label: "Yearly" },
                    ]}
                />
            </div>
            <div className = "setBudget">
                <h4>Set Max budget</h4>
                <input
                    type="text"
                    value={tempMax}
                    onChange={handleNewAmt}
                    placeholder="Enter Max Budget"
                />
            </div>
            <div className = "confirm">
                <h4>Confirm Changes</h4>
                <button onClick = {confirmAll}>Confirm</button>
                <button onClick = {revertAll}>Undo</button>
            </div>
        </div>
        
    );
}

export default SettingsTab;
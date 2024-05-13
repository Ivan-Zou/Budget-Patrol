import React from 'react';
import './Navbar.css';

function Navbar({ currentTab, setCurrentTab }) {
    return (
        <div className="navbar">
            <button 
                className={`nav-button ${currentTab === 'addPurchase' ? 'active' : ''}`} 
                onClick={() => setCurrentTab('addPurchase')}>
                Add Purchase
            </button>
            <button 
                className={`nav-button ${currentTab === 'viewBudget' ? 'active' : ''}`}
                onClick={() => setCurrentTab('viewBudget')}>
                View Budget
            </button>
            <button 
                className={`nav-button ${currentTab === 'settings' ? 'active' : ''}`}
                onClick={() => setCurrentTab('settings')}>
                Settings
            </button>
            <button 
                className={`nav-button ${currentTab === 'excel_export' ? 'active' : ''}`}
                onClick={() => setCurrentTab('excel_export')}>
                Export to Excel
            </button>
        </div>
    );
}

export default Navbar;

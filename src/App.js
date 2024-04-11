import React, { useState, useEffect } from 'react';
import './App.css';

import AddPurchaseTab from './tabs/AddPurchaseTab';
import ViewBudgetTab from './tabs/ViewBudgetTab';
import SettingsTab from './tabs/SettingsTab';

function App() {
    const [currentTab, setCurrentTab] = useState('addPurchase');
    
    return (
        <div className="App">
            <div class="navbar">
                <button onClick={() => setCurrentTab('addPurchase')}>Add Purchase</button>
                <button onClick={() => setCurrentTab('viewBudget')}>View Budget</button>
                <button onClick={() => setCurrentTab('settings')}>Settings</button>
            </div>

            {currentTab === 'addPurchase' && <AddPurchaseTab />}
            {currentTab === 'viewBudget' && <ViewBudgetTab />}
            {currentTab === 'settings' && <SettingsTab />}
            
        </div>
    );
}

export default App;
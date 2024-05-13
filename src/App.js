import React, { useState } from 'react';
import './App.css';

import AddPurchaseTab from './tabs/AddPurchaseTab';
import ViewBudgetTab from './tabs/ViewBudgetTab';
import SettingsTab from './tabs/SettingsTab';
import Navbar from './components/NavBar';

function App() {
    const [currentTab, setCurrentTab] = useState('addPurchase');
    
    return (
        <div className="App">
            <div>
                <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </div>

            {currentTab === 'addPurchase' && <AddPurchaseTab />}
            {currentTab === 'viewBudget' && <ViewBudgetTab />}
            {currentTab === 'settings' && <SettingsTab />}
            
        </div>
    );
}

export default App;
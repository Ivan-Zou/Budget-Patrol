import React, { useState, useEffect } from 'react';
import './App.css';

import AddPurchaseTab from './tabs/AddPurchaseTab';
import ViewBudgetTab from './tabs/ViewBudgetTab';
import SettingsTab from './tabs/SettingsTab';
import Navbar from './components/NavBar';
import ExcelExportTab from './tabs/ExportToSheetTab';

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
            {currentTab === 'excel_export' && <ExcelExportTab />}
            
        </div>
    );
}

export default App;

// <button onClick={() => setCurrentTab('addPurchase')}>Add Purchase</button>
// <button onClick={() => setCurrentTab('viewBudget')}>View Budget</button>
// <button onClick={() => setCurrentTab('settings')}>Settings</button>
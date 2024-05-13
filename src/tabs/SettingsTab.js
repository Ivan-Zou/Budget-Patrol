import React, { useState, useEffect } from 'react';
import './SettingsTab.css';
import { showNotification } from '../components/Notification';
import * as XLSX from 'xlsx'; // npm install xlsx


function SettingsTab() {
    const [max, setMax] = useState(() => {
        const savedMax = localStorage.getItem('max');
        return savedMax !== null ? parseFloat(savedMax) : 1000.00;
    });
    const [tempMax, setTempMax] = useState(max);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Read categories from memory
        chrome.storage.local.get({ categories: [] }, (result) => {
            setCategories(result.categories);
        });
    }, []);

    const handleNewAmt = (event) => {
        setTempMax(event.target.value);
    }

    const confirmAll = () => {
        setMax(tempMax);
        localStorage.setItem('max', tempMax);
        showNotification("Max Budget Updated", "Confirmed!");
    }

    const revertAll = () => {
        showNotification("Max Budget Reset", "Confirmed!");
        setTempMax(max);
    }

    const resetRemaining = () => {
        // Reset remaining amounts of all categories
        const updatedCategories = categories.map(category => ({
            ...category,
            remaining: category.allocated
        }));
        setCategories(updatedCategories);
        // Update categories in local storage
        chrome.storage.local.set({ categories: updatedCategories });
        showNotification("Category Allocations Reset", "Confirmed!");
    };

    // Export to Excel
    const [loading, setLoading] = useState(false);

    const exportToExcel = async () => {
        setLoading(true);

        // Load categories from storage
        const categories = await new Promise((resolve) => {
            chrome.storage.local.get({ categories: [] }, (result) => {
                resolve(result.categories);
            });
        });

        // Define worksheet data with headers
        const worksheetData = categories.map(category => ({
            Category: category.name,
            'Allocated': category.allocated,
            'Remaining': category.remaining,
        }));
        const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: ["Category", "Allocated", "Remaining"] });

        // Create a new workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Budget");

        // Write the workbook to a binary string
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Convert binary string to Uint8Array
        const buffer = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < wbout.length; i++) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([buffer], { type: 'application/octet-stream' });

        // Create a URL and download the file
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Budget.xlsx';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

        setLoading(false);
    };

    return (
        <div>
            <div className="settings-heading">
                <h3>Settings</h3>
            </div>
            <div className="setBudget">
                <h4>Set Max budget</h4>
                <input
                    type="text"
                    value={tempMax}
                    onChange={handleNewAmt}
                    placeholder="Enter Max Budget"
                />
            </div>
            <div className="confirm">
                <h4>Confirm Changes</h4>
                <button onClick={confirmAll}>Confirm</button>
                <button onClick={revertAll}>Undo</button>
            </div>
            <div className = "reset">
                <h4>Reset Categories</h4>
                <button onClick={resetRemaining}>Reset Remaining Amounts</button>
            </div>
            <div>
                <h4>Export Budget to Excel</h4>
                <button onClick={exportToExcel} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Excel'}
                </button>
            </div>
        </div>
    );
}

export default SettingsTab;

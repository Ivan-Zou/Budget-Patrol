import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryItem from '../components/CategoryItem';
import { showNotification } from '../components/Notification';

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

    return (
        <div>
            <h3>Settings</h3>
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
        </div>
    );
}

export default SettingsTab;

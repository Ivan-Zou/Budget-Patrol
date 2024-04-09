/* global chrome */
import React, { useState, useEffect } from 'react';

function AddPurchaseTab() {
    const [category, setCategory] = useState("");
    const [cost, setCost] = useState(0.00);
    const [description, setDescription] = useState("");

    const handleSelectCategory = (event) => {
        setCategory(event.target.value);
    };
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    };

    function updateBudget() { 
        chrome.storage.local.get({ categories: []}, result => {
            const categories = result.categories;

            categories[category].budgetLeft -= cost;

            chrome.storage.local.set({ categories }, () => {
                console.log("Budget Updated");
            })
        });
    };

    function cancel() {
        document.getElementById("amount_input").value = 0.00;
        document.getElementById("description_input").value = "";
    };

    return (
        <div>
            <div id="category_dropdown">
                <label for="category">Category:</label><br/>
                <select name="category" id="category" onChange={handleSelectCategory}>
                    <option value="food">Food</option>
                    <option value="clothes">Clothes</option>
                    <option value="school">School</option>
                    {/* This is filler need to store added categories in a list and display them */}
                </select>
            </div>
            <div id="amount_container">
                <label>Amount: $ </label><br/>
                <input id="amount_input" type="number" placeholder="0.00" name="cost" min="0" step="0.01" title="Currency" pattern="^\d*(\.\d{1,2})?$" value={cost} onInput={e => setCost(e.target.value)}/>
            </div>
            <div id="description_container">
                <label> Description:</label><br/>
                <textarea id="description_input" type="text" name="description" rows="4" cols="40" onChange={handleSetDescription}>
                    
                </textarea>
            </div>
            <div id="preview_output">
                <label> Preview: </label>
                
            </div>
            <div class="submission_btns">
                <button onClick={() => updateBudget()}>Submit</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    );
}

export default AddPurchaseTab;
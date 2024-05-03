/* global chrome */
import React, { useState, useEffect } from 'react';
import "./AddPurchaseTab.css";

function AddPurchaseTab() {
    const [category, setCategory] = useState("");
    const [cost, setCost] = useState(0.00);
    const [description, setDescription] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [preview, setPreview] = useState(0);

    const handleSelectCategory = (event) => {
        setCategory(event.target.value);
    };
    
    const handleSetDescription = (event) => {
        setDescription(event.target.value);
    };


    chrome.storage.local.get({ categories: []}, result => {
        const categories = result.categories;

        const categoryNames = [];
        let preview_remaining = 0;

        for (let i = 0; i < categories.length; i++) {
            categoryNames.push(categories[i].name);
            if (categories[i].name == category) {
                preview_remaining = categories[i].remaining - cost;
            }
        }

        setCategoryList(categoryNames);
        setPreview(preview_remaining);
    });

    function updateBudget() { 
        chrome.storage.local.get({ categories: []}, result => {
            const categories = result.categories;

            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name == category) {
                    categories[i].remaining = categories[i].remaining - cost;
                }
            }

            chrome.storage.local.set({ categories }, () => {
                console.log("Budget Updated");
            })
        });
    };

    function cancel() {
        document.getElementById("amount_input").value = 0.00;
        document.getElementById("description_input").value = "";
        setCost(0.00);
        setDescription("");
    };

    return (
        <div className="add_purchase_tab">
            <h3>Add Purchase</h3>
            <div id="category_dropdown">
                <label for="category">Category:</label><br/>
                <select name="category" id="category" onChange={handleSelectCategory}>
                    <option hidden disabled selected value>Select Category</option>
                    {categoryList.map((category) => (
                        <option value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div id="amount_container">
                <label>Amount: $ </label><br/>
                <input id="amount_input" type="number" placeholder="0.00" name="cost" min="0" step="0.01" title="Currency" pattern="^\d*(\.\d{1,2})?$" value={cost} onInput={e => setCost(+e.target.value)}/>
            </div>
            <div id="description_container">
                <label> Description:</label><br/>
                <textarea id="description_input" type="text" name="description" rows="4" cols="40" onChange={handleSetDescription}>
                    
                </textarea>
            </div>
            <div id="preview_output">
                <h3> Budget Preview </h3>
                <p class="preview_amount">${preview}</p>
            </div>
            <div class="submission_btns">
                <button onClick={() => {updateBudget(); cancel()}}>Submit</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    );
}

export default AddPurchaseTab;
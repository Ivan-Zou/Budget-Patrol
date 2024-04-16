/* global chrome */
import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import TotalBudget from '../components/TotalBudget';
import CategoryItem from '../components/CategoryItem';
 import './ViewBudgetTab.css';

function ViewBudgetTab() {
    const [totalAllocated, setTotalAllocated] = useState(0)
    const [totalRemaining, setTotalRemaining] = useState(0)
    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState("");
    const [categoryItems, setCategoryItems] = useState([
        {
            key: 0,
            name: "",
            allocated: 0,
            remaining: 0,
        }
    ])

    chrome.storage.local.get({ categories: []}, result => {
        const categories = result.categories;

        let allocated = 0;
        let remaining = 0;
        const categoryList = [];

        for (let i = 0; i < categories.length; i++) {
            allocated = allocated + categories[i].allocated;
            remaining = remaining + categories[i].remaining;
            categoryList.push(categories[i]);
        }

        setTotalAllocated(allocated);
        setTotalRemaining(remaining);
        setCategoryItems(categoryList);
    });

    function addCategory() {
        chrome.storage.local.get({ categories: [] }, (result) => {
            const categories = result.categories;
    
            const newCategory = {
            key: categories.length, // bad need to find better key
            name: category,
            allocated: budget,
            remaining: budget,
            icon: "💡", 
            };
    
            categories.push(newCategory);
            
            chrome.storage.local.set({ categories }, () => {
            console.log('Category saved');
            });
        });
    }

    function cancel() {
        document.getElementById("budget_input").value = 0.00;
        document.getElementById("category_input").value = "";
        setBudget(0);
        setCategory("");
    };

    return (
        <div className='view-budget-tab'>
            <h3>View Budget</h3>

            <TotalBudget allocated={totalAllocated} remaining={totalRemaining} />
            
            <CategoryList categories={categoryItems}>
                
            </CategoryList>
            <div>
                <h3>Add Category</h3>
                <div id="category_input_container">
                    <label>Category: </label><br/>
                    <input id="category_input" type="text" placeholder="Enter Category" name="category" value={category} onInput={e => setCategory(e.target.value)}/>
                </div>
                <div id="budget_container">
                    <label>Budget: $ </label><br/>
                    <input id="budget_input" type="number" placeholder="0.00" name="budget" min="0" step="0.01" title="Currency" pattern="^\d*(\.\d{1,2})?$" value={budget} onInput={e => setBudget(+e.target.value)}/>
                </div>
                <div class="submission_btns">
                    <button onClick={() => {addCategory(); cancel()}}>Submit</button>
                    <button onClick={() => cancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ViewBudgetTab;
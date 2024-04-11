import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryItem from '../components/CategoryItem';

function ViewBudgetTab() {
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

    chrome.storage.local.get({ categories: [] }, (result) => {
        const categories = result.categories;
  
        const newCategory = {
          key: categories.length,
          name: category,
          allocated: budget,
          remaining: budget,
        };
  
        categories.push(newCategory);

        setCategoryItems(categories)
  
        chrome.storage.local.set({ categories }, () => {
          console.log('Category saved');
        });
    });

    return (
        <div>
            <h3>View Budget</h3>
            <CategoryList>
                
            </CategoryList>
            <div>
                <h3>Add Category</h3>
                <div id="category_input_container">
                    <label>Category: </label><br/>
                    <input id="category_input" type="text" placeholder="Enter Category" name="category" value={category} onInput={e => setCategory(e.target.value)}/>
                </div>
                <div id="budget_container">
                    <label>Budget: $ </label><br/>
                    <input id="budget_input" type="number" placeholder="0.00" name="budget" min="0" step="0.01" title="Currency" pattern="^\d*(\.\d{1,2})?$" value={budget} onInput={e => setBudget(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}

export default ViewBudgetTab;
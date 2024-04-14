/* global chrome */
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


   function addCategory() {
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
   }


   function cancel() {
       document.getElementById("budget_input").value = 0.00;
       document.getElementById("category_input").value = "";
   };


   return (
       <div>
           <h3>View Budget</h3>
           <CategoryList
               categories={[
                   { id: 1, name: 'Food', allocated: 300, remaining: 150, icon: '🍔' },
                   { id: 2, name: 'Utilities', allocated: 200, remaining: 80, icon: '💡' },
                   { id: 3, name: 'Entertainment', allocated: 100, remaining: 50, icon: '🎬' },
                   { id: 4, name: 'Travel', allocated: 500, remaining: 250, icon: '✈️' }
               ]}
           />


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
               <div class="submission_btns">
                   <button onClick={() => addCategory()}>Submit</button>
                   <button onClick={() => cancel()}>Cancel</button>
               </div>
           </div>
       </div>
   );
}


export default ViewBudgetTab;
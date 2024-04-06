import React, { useState, useEffect } from 'react';

function AddPurchaseTab() {
    const [submitted, submit] = useState("no"); // this is just a placeholder for no error in submit button
    return (
        <div>
            <div id="category_dropdown">
                <label for="category">Category:</label><br/>
                <select name="category" id="category">
                    <option value="food">Food</option>
                    <option value="clothes">Clothes</option>
                    <option value="school">School</option>
                    {/* This is filler need to store added categories in a list and display them */}
                </select>
            </div>
            <div id="amount_input">
                <label>Amount: $ </label><br/>
                <input type="number" placeholder="0.00" name="cost" min="0" step="0.01" title="Currency" pattern="^\d*(\.\d{1,2})?$"/>
            </div>
            <div id="description_input">
                <label> Description:</label><br/>
                <textarea type="text" name="description" rows="4" cols="40">
                    Enter Description...
                </textarea>
            </div>
            <div id="preview_output">
                <label> Preview: </label>
                
            </div>
            <div class="submission_btns">
                <button onClick={() => submit("yes")}>Submit</button>
                <button onClick={() => submit("no")}>Cancel</button>
            </div>
        </div>
    );
}

export default AddPurchaseTab;
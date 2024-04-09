import React, { useState } from 'react';
import "./Components.css";

const CategoryList = (props) => {

    return (
        <div >
            <ul className="category-header">
                <li>Category</li>
                <li>Allocated</li>
                <li>Remaining</li>
            </ul>
            <ul className="category-list">
                <li>{props.chidren}</li>
            </ul>
        </div>
    );
};

export default CategoryList;
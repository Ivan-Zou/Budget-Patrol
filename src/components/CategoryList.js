import React, { useState } from 'react';

const CategoryList = (props) => {

    return (
        <div >
            <ul>
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
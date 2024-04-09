import React, { useState } from 'react';

const CategoryItem = (props) => {
    const { key, name, allocatedBudget, budgetLeft, onDelete } = props;

    return (
        <div>
            <ul className="category-item" key={key}>
                <li>
                    <span>{name}</span>
                </li>
                <li>
                    <span>{allocatedBudget}</span>
                </li>
                <li>
                    <span>{budgetLeft}</span>
                </li>
            </ul>
            <button className="delete-category" onClick={() => onDelete()}>
                ** Trash Can Emoji **
            </button>
        </div>
        

    );
};


export default CategoryItem;
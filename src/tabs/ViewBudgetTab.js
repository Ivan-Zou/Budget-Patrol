import React, { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import CategoryItem from '../components/CategoryItem';

function ViewBudgetTab() {
    const [categoryItems, setCategoryItems] = useState([
        {
            key: 0,
            name: "",
            allocated: 0,
            remaining: 0,
        }
    ])

    return (
        <div>
            <h3>View Budget</h3>
            <CategoryList>
                
            </CategoryList>
        </div>
    );
}

export default ViewBudgetTab;
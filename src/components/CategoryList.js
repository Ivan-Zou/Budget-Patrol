// CategoryList.jsx
import React from 'react';
import CategoryItem from './CategoryItem';
import './CategoryList.css'; 

const CategoryList = ({categories }) => {
    
  return (
    <div className="category-list">
      <h2>Categories</h2>
      {categories.map(category => (
        <CategoryItem key={category.key} {...category}  />
      ))}
    </div>
  );
};

export default CategoryList;


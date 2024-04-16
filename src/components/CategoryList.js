// CategoryList.jsx
import React from 'react';
import CategoryItem from './CategoryItem';
import './CategoryList.css'; 

const CategoryList = () => {
  const categories = [
    { id: 1, name: 'Food', allocated: 300, remaining: 150, icon: '🍔' },
    { id: 2, name: 'Utilities', allocated: 200, remaining: 80, icon: '💡' },
    { id: 3, name: 'Entertainment', allocated: 100, remaining: 50, icon: '🎬' },
    { id: 4, name: 'Travel', allocated: 500, remaining: 250, icon: '✈️' },
  ];

  return (
    <div className="category-list">
      <h2>Categories</h2>
      {categories.map(category => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryList;


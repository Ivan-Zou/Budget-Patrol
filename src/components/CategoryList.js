import React from 'react';
import CategoryItem from './CategoryItem';
import './CategoryList.css'; // Assume this file contains the necessary styles


const CategoryList = ({ categories }) => {


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

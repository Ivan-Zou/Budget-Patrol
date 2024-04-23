// CategoryItem.jsx
import React, {useState, useEffect} from 'react';
import './CategoryItem.css'; // Assume styling specific to the category item is here
import { showNotification } from './Notification.js';

const CategoryItem = ({ name, allocated: initialAllocated, remaining: initialRemaining, icon }) => {
  const [allocated, setAllocated] = useState(initialAllocated);
  const [tempAllocated, setTempAllocated] = useState(initialAllocated);
  const [remaining, setRemaining] = useState(initialRemaining);
  const [tempRemaining, setTempRemaining] = useState(initialRemaining);


  useEffect(() => {
    // Update local storage when allocated or remaining changes
    chrome.storage.local.get({ categories: [] }, (result) => {
      const categories = result.categories.map(category => {
        if (category.name === name) {
          return { ...category, allocated, remaining };
        }
        return category;
      });
      chrome.storage.local.set({ categories });
    }); 
  }, [allocated, remaining]);

  // Calculate the percentage remaining for the progress bar
  const percentageRemaining = (remaining / allocated) * 100;


  const handleAllocatedChange = (event) => {
    const value = event.target.value;
    setTempAllocated(value);
  };

  const handleRemainingChange = (event) => {
    const value = event.target.value;
    setTempRemaining(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Apply changes if the return key is pressed
      const numAlloc = parseFloat(tempAllocated);
      const numRem = parseFloat(tempRemaining);
      if (!isNaN(numAlloc) && numAlloc >= numRem && numAlloc >= 0) {
        setAllocated(numAlloc);
        showNotification("Allocation Updated", "Confirmed!");
      } else {
        setTempAllocated(allocated); // Reset to original value
        showNotification("Invalid Allocation", "Warning");
      }

      if (!isNaN(numRem) && numRem<= numAlloc) {
        setRemaining(numRem);
        showNotification("Remaining Updated", "Confirmed!");
      } else {
        setTempRemaining(remaining); // Reset to original value
        showNotification("Invalid Remamining", "Warning");
      }
    }
  };

  function deleteCategory() {
    chrome.storage.local.get({ categories: []}, result => {
      const categories = result.categories;

      let del = -1;
      for (let i = 0; i < categories.length; i++) {
          if (categories[i].name == name) {
              del = i;
              break;
          }
      };

      if (del == 0) {
        categories.shift();
      } else {
        categories.splice(del,del);
      }

      chrome.storage.local.set({ categories }, () => {
          showNotification("Category Deleted", "Confirmed!");
      })
  });
  }

  return (
    <div className="category-item">
      <span className="icon" role="img" aria-label={name}>{icon}</span>
      <div className="category-content">
        <span className="category-name">{name}</span>
        <div className="budget-details">
          <label className="allocated">
            Allocated: $
            <input
              type="number"
              value={tempAllocated}
              onChange={handleAllocatedChange}
              onKeyDown={handleKeyDown}
              style={{ width: '100px', marginLeft: '5px' }}
            />
          </label>
          <label className="remaining">
            Remaining: $
            <input
              type="number"
              value={tempRemaining}
              onChange={handleRemainingChange}
              onKeyDown={handleKeyDown}
              style={{ width: '100px', marginLeft: '5px' }}
            />
          </label>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentageRemaining}%` }}></div>
        </div>
      </div>
      <div className="trash_btn">
        <button onClick={() => deleteCategory()}>🗑️</button>
      </div>
    </div>
  );
  
};

export default CategoryItem;



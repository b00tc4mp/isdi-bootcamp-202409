import React from 'react';

const BrowserInput = ({ 
  placeholder = "Which browser do you use", 
  listId = "browsers", 
  options = ["Barcelona", "Madrid", "Málaga", "Valencia"],
  className = "input"
}) => {
  return (
    <>
      <input type="text" className={className} placeholder={placeholder} list={listId} />
      <datalist id={listId}>
        {options.map((browser, i) => (
          <option key={i} value={browser} />
        ))}
      </datalist>
    </>
  );
};

export default BrowserInput;

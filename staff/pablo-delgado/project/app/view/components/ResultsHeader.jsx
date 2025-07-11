import React from 'react';
import CustomSearchBox from '../CustomSearchBox';
import CategoryFilter from './CategoryFilter';

const ResultsHeader = ({ category, onCategoryChange }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-sm w-full px-4 pt-6 pb-4 rounded-b-xl">

      <div className="w-full">
        <CustomSearchBox />

        <div className="mt-6 flex justify-center">
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;

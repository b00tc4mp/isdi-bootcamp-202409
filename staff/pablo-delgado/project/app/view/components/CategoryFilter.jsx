import React from "react";

const categories = ["vets", "grooming", "trainers", "boarding", "petsitter"];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter flex flex-wrap gap-2 items-center justify-center">
      <button
        type="button"
        onClick={() => onCategoryChange('')}
        className="bg-[#006D77] text-white rounded-full px-4 py-2 text-sm hover:bg-[#00565f] transition-colors"
      >
        X
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onCategoryChange(cat)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            selectedCategory === cat
              ? "bg-[#006D77] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

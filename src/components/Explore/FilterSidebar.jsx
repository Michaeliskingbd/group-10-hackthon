import React from 'react';

const FilterSidebar = ({ 
  categories = [], 
  selectedCategory, 
  onSelectCategory, 
  priceValue, 
  onPriceChange,
  showOtherInput,
  customCategory,
  onCustomCategoryChange 
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-10">
      {/* Category Section */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? "bg-[#111827] text-white" 
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
          
          <button
            onClick={() => onSelectCategory("Other")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "Other" 
              ? "bg-[#111827] text-white" 
              : "bg-gray-50 text-gray-600 border border-dashed border-gray-300"
            }`}
          >
            + Other
          </button>
        </div>

        {/* Custom Input for "Other" category */}
        {showOtherInput && (
          <div className="mt-4">
            <input 
              type="text"
              placeholder="Specify category..."
              value={customCategory}
              onChange={(e) => onCustomCategoryChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#2D7A8B] transition-all"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Price Range</h3>
          <span className="text-xs font-bold text-[#2D7A8B]">
            ₦{Number(priceValue).toLocaleString()}
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="1000000" 
          step="10000"
          value={priceValue}
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#111827]"
        />
        <div className="flex justify-between mt-2 text-[10px] text-gray-300 font-bold">
          <span>MIN</span>
          <span>MAX</span>
        </div>
      </div>
      
      {/* Engagement Type / Section filter has been removed from here */}
    </aside>
  );
};

export default FilterSidebar;
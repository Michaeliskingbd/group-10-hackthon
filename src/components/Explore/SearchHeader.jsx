import React from 'react';

const SearchHeader = ({ categories = [], onSearchChange, onCategorySelect, onSectionSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Explore Talents</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search talents... */}
        <div className="flex-[1.5] relative group">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#2D7A8B]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search talents..." 
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-[#2D7A8B] transition-all"
          />
        </div>

        {/* All Categories Dropdown */}
        <div className="relative flex-1">
          <select 
            onChange={(e) => onCategorySelect(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 outline-none appearance-none cursor-pointer focus:bg-white focus:border-[#2D7A8B] transition-all font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* All Sections Dropdown */}
        <div className="relative flex-1">
          <select 
            onChange={(e) => onSectionSelect(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-600 outline-none appearance-none cursor-pointer focus:bg-white focus:border-[#2D7A8B] transition-all font-medium"
          >
            <option value="All">All Sections</option>
            <option value="Sponsorship">Sponsorship</option>
            <option value="Hireable">Hireable</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
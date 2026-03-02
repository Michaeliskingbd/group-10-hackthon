import React from 'react';

const BasicInfo = ({ formData, updateFields }) => {
  const categories = [
    "Acting", "Singing", "Chanting", "Dancing", "Playing Musical Instruments",
    "Comedy", "Painting", "Storytelling", "Scriptwriting", "Running",
    "Swimming", "Football", "Basketball", "Yoga", "Other" // Added Other
  ];

  return (
    <div className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Row 1: Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-900">Full Name</label>
          <input 
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFields({ fullName: e.target.value })}
            placeholder="Your full name"
            className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 transition-all outline-none placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-900">Stage Name</label>
          <input 
            type="text"
            value={formData.stageName}
            onChange={(e) => updateFields({ stageName: e.target.value })}
            placeholder="Your stage name"
            className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 transition-all outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Row 2: Category Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900">Category</label>
        <div className="relative group">
          <select 
            value={formData.category}
            onChange={(e) => updateFields({ category: e.target.value })}
            className={`w-full p-3 bg-gray-50 border rounded-xl appearance-none transition-all outline-none cursor-pointer ${
              formData.category === 'other' ? 'border-[#2D7A8B]' : 'border-transparent'
            } focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 text-gray-700`}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#2D7A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* CONDITIONAL INPUT: Shows only if "Other" is selected */}
      {formData.category === 'other' && (
        <div className="flex flex-col gap-2 animate-in zoom-in-95 duration-300">
          <label className="text-sm font-bold text-[#2D7A8B]">Please specify your category</label>
          <input 
            type="text"
            value={formData.customCategory || ''}
            onChange={(e) => updateFields({ customCategory: e.target.value })}
            placeholder="e.g. Circus Artist, Chef, etc."
            className="w-full p-3 bg-white border border-[#2D7A8B] rounded-xl focus:ring-2 focus:ring-[#2D7A8B]/10 transition-all outline-none"
            autoFocus
          />
        </div>
      )}

      {/* Row 3: Location */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-900">Location</label>
        <input 
          type="text"
          value={formData.location}
          onChange={(e) => updateFields({ location: e.target.value })}
          placeholder="City, Country"
          className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 transition-all outline-none placeholder-gray-400"
        />
      </div>

    </div>
  );
};

export default BasicInfo;
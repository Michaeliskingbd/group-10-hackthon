import React from 'react';

const Pricing = ({ formData, updateFields }) => {
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Phone Input */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Phone / WhatsApp (private)</label>
        <input 
          type="text" 
          value={formData.phone || ''}
          onChange={(e) => updateFields({ phone: e.target.value })}
          placeholder="+1 234 567 890" 
          className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none transition-all" 
        />
      </div>

      {/* Price Input */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Starting Price</label>
        <input 
          type="text" 
          value={formData.price || ''}
          onChange={(e) => updateFields({ price: e.target.value })}
          placeholder="e.g. $500 per event" 
          className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none transition-all" 
        />
      </div>

      {/* Availability Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Availability</label>
        <div className="relative group">
          <select 
            value={formData.availability || ''}
            onChange={(e) => updateFields({ availability: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-transparent rounded-xl appearance-none focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none text-gray-500 cursor-pointer"
          >
            <option value="">Select availability</option>
            <option value="full-time">Full-time</option>
            <option value="weekends">Weekends Only</option>
            <option value="evenings">Evenings Only</option>
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#2D7A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
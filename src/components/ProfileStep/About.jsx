import React from 'react';

const About = ({ formData, updateFields }) => {
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-500">
      {/* Bio Section */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Bio</label>
        <textarea 
          value={formData.bio || ''}
          onChange={(e) => updateFields({ bio: e.target.value })}
          rows="4"
          placeholder="Tell us about yourself and your experience..."
          className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none transition-all placeholder-gray-400"
        />
      </div>

      {/* Detailed Description Section */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Detailed Description</label>
        <textarea 
          value={formData.description || ''}
          onChange={(e) => updateFields({ description: e.target.value })}
          rows="4"
          placeholder="Describe your performances, style, and what makes you unique..."
          className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none transition-all placeholder-gray-400"
        />
      </div>

      {/* Tags Section */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Tags</label>
        <input 
          type="text"
          value={formData.tags || ''}
          onChange={(e) => updateFields({ tags: e.target.value })}
          placeholder="e.g. wedding, corporate, festival (comma separated)"
          className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#2D7A8B] focus:ring-2 focus:ring-[#2D7A8B]/10 outline-none transition-all placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default About;
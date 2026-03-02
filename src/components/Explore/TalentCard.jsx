import React from 'react';

export const TalentCard = ({ talent }) => {
  return (
    <div className="bg-white rounded-[4%] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img 
          src={talent.image} 
          alt={talent.name}
          // Added 'object-top' to prioritize showing the face/head
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
            talent.badge === 'Hireable' ? 'bg-[#10B981]' : 'bg-[#3B82F6]'
          }`}>
            {talent.badge}
          </span>
          
          {talent.isPro && (
            <span className="bg-[#FBBF24] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">
              PRO
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#111827]">{talent.name}</h3>
          <div className="flex items-center text-[#FBBF24]">
            <span className="text-sm font-bold mr-1">★</span>
            <span className="text-sm font-bold text-gray-700">{talent.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[20%]">
          {talent.description}
        </p>

        <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all">
          View Profile
        </button>
      </div>
    </div>
  );
};
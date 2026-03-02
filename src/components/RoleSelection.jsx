import React from 'react';

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        
        {/* Card 1: Become a Talent */}
        <div className="bg-white rounded-3xl p-12 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Become a Talent</h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-sm">
            Showcase your skills, get discovered by brands and event organizers, and grow your career.
          </p>
          <button className="w-full sm:w-auto px-10 py-3.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-gray-900 font-bold rounded-xl transition-colors">
            Create Your Profile
          </button>
        </div>

        {/* Card 2: Find a Talent */}
        <div className="bg-white rounded-3xl p-12 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find a Talent</h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-sm">
            Search, filter, and connect with verified talents for events, sponsorships, and collaborations.
          </p>
          <button className="w-full sm:w-auto px-10 py-3.5 bg-[#1F2937] hover:bg-[#111827] text-white font-bold rounded-xl transition-colors">
            Start Exploring
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoleSelection;
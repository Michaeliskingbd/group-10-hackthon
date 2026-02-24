import React from 'react';

const MediaView = () => {
  return (
    <div className="space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Picture Section */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-900">Profile Picture</label>
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-white hover:bg-gray-50 hover:border-[#2D7A8B] transition-all cursor-pointer group">
          <div className="mb-4 text-gray-400 group-hover:text-[#2D7A8B] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Click or drag to upload</p>
          <p className="text-gray-400 text-xs mt-1">JPG, PNG up to 5MB</p>
        </div>
      </div>

      {/* Performance Video Section */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-gray-900">Performance Video</label>
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 flex flex-col items-center justify-center bg-white hover:bg-gray-50 hover:border-[#2D7A8B] transition-all cursor-pointer group">
          <div className="mb-4 text-gray-400 group-hover:text-[#2D7A8B] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Upload a short performance clip</p>
          <p className="text-gray-400 text-xs mt-1">MP4, MOV up to 50MB</p>
        </div>
      </div>

    </div>
  );
};

export default MediaView;
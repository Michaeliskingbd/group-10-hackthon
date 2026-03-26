import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-[580px] flex items-center justify-center text-white text-center px-4 z-88"
      style={{
        backgroundImage: "url('https://stage-link-talent.lovable.app/assets/hero-image-BtNdPGF2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* bg overlay using opacity */}
      <div className="absolute inset-0 bg-teal-400/60 " />

      {/* styling of the content in the hero section */}
      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Trust badge */}
        <span className="inline-block border border-white/60 text-white text-xs px-4 py-1.5 rounded-full mb-6">
          Trusted by 2,000+ performers worldwide
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Discover & Hire World-Class Talent for Any Event
        </h1>

        {/* Subtext */}
        <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
          StageLink connects event organizers, brands, and sponsors with verified
          performers through a secure, professional marketplace.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">

          {/* Search input */}
          <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by category or name..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          {/* Location input */}
          <div className="flex items-center gap-2 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <input
              type="text"
              placeholder="Location..."
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>

          {/* Search button → goes to explore */}
          <button
            onClick={() => navigate("/explore")}
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm px-8 py-3 transition-colors"
          >
            Search
          </button>
        </div>

      </div>
    </div>
  );
}

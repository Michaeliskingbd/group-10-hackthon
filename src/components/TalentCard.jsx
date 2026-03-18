import React from "react";
import { useNavigate } from "react-router-dom";

export default function TalentCard({ talent }) {
  
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/talent/${talent.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group">

      {/* ── Image with badges ── */}
      <div className="relative overflow-hidden h-56 sm:h-64">
        <img
          src={talent.image}
          alt={talent.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left: Hireable / Sponsorship */}
        {talent.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold text-white px-3 py-1 rounded-full ${talent.badgeColor}`}>
            {talent.badge}
          </span>
        )}

        {/* Top-right: PRO */}
        {talent.tier && (
          <span className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${talent.tierColor}`}>
            {talent.tier}
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="p-4">

        {/* Name + rating */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-base">{talent.name}</h3>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">{talent.rating}</span>
          </div>
        </div>

        {/* Category pill */}
        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
          {talent.category}
        </span>

        {/* Bio */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {talent.bio}
        </p>

        {/* ── Footer: location + button ── */}
        <div className="flex items-center justify-between gap-2">

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs min-w-0">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="truncate">{talent.location}</span>
          </div>

          {/* View Profile button */}
          <button
            onClick={goToProfile}
            className="flex-shrink-0 text-sm font-semibold text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // NavLink className helper — active = underlined, inactive = gray
  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-gray-900 border-b-2 border-gray-900 pb-0.5"
      : "text-gray-500 hover:text-gray-900 transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <span className="text-white text-sm font-bold">SL</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">StageLink</span>
        </NavLink>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <NavLink to="/explore"     className={navClass}>Explore Talents</NavLink>
          <NavLink to="/categories"  className={navClass}>Categories</NavLink>
          <NavLink to="/how-it-works" className={navClass}>How It Works</NavLink>
        </div>

        {/* ── Desktop auth buttons ── */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-gray-700 font-medium px-3 py-2 hover:text-gray-900 transition-colors">
            Log In
          </button>
          <button className="text-sm bg-gray-900 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors">
            Create Profile
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <NavLink to="/explore"      onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-gray-900 py-2.5">Explore Talents</NavLink>
          <NavLink to="/categories"   onClick={() => setMenuOpen(false)} className="block text-sm text-gray-500 py-2.5">Categories</NavLink>
          <NavLink to="/how-it-works" onClick={() => setMenuOpen(false)} className="block text-sm text-gray-500 py-2.5">How It Works</NavLink>
          <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
            <button className="flex-1 text-sm border border-gray-300 rounded-lg py-2.5 font-medium text-gray-700">Log In</button>
            <button className="flex-1 text-sm bg-gray-900 text-white rounded-lg py-2.5 font-semibold">Create Profile</button>
          </div>
        </div>
      )}
    </nav>
  );
}

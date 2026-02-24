import React from "react";
import { useState, useMemo } from "react";
import TalentCard from "./TalentCard";
import { ALL_TALENTS, CATEGORIES, SECTIONS } from "../data/talents";

const MAX_PRICE = 500000;

export default function Explore() {
  // ── Top bar state ─────────────────────────────────────────────────────────
  const [search, setSearch]                   = useState("");
  const [categoryDropdown, setCategoryDropdown] = useState("All Categories");
  const [sectionDropdown, setSectionDropdown]   = useState("All Sections");

  // ── Sidebar state ─────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSection, setActiveSection]   = useState("All");
  const [priceRange, setPriceRange]         = useState(MAX_PRICE);

  // ── Mobile filter drawer ──────────────────────────────────────────────────
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Sync helpers: keep top dropdowns & sidebar pills in sync ─────────────

  const handleCategoryDropdown = (val) => {
    setCategoryDropdown(val);
    setActiveCategory(val === "All Categories" ? "All" : val);
  };

  const handleSectionDropdown = (val) => {
    setSectionDropdown(val);
    setActiveSection(val === "All Sections" ? "All" : val);
  };

  const handleSidebarCategory = (cat) => {
    setActiveCategory(cat);
    setCategoryDropdown(cat === "All" ? "All Categories" : cat);
    setDrawerOpen(false);
  };

  const handleSidebarSection = (sec) => {
    setActiveSection(sec);
    setSectionDropdown(sec === "All" ? "All Sections" : sec);
    setDrawerOpen(false);
  };

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredTalents = useMemo(() => {
    return ALL_TALENTS.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.bio.toLowerCase().includes(search.toLowerCase());

      const matchCategory = activeCategory === "All" || t.category === activeCategory;

      const matchSection =
        activeSection === "All" ||
        (activeSection === "Hireable"    && t.badge === "Hireable") ||
        (activeSection === "Sponsorable" && t.badge === "Sponsorship");

      const matchPrice = t.price <= priceRange;

      return matchSearch && matchCategory && matchSection && matchPrice;
    });
  }, [search, activeCategory, activeSection, priceRange]);

  // ── Active filter count for mobile badge ─────────────────────────────────
  const activeFilterCount = [
    activeCategory !== "All",
    activeSection  !== "All",
    priceRange     <  MAX_PRICE,
  ].filter(Boolean).length;

  // ── Sidebar content (shared by desktop + mobile drawer) ──────────────────
  const SidebarContent = () => (
    <div className="space-y-8">

      {/* Category pills */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSidebarCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range slider */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={5000}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-gray-900 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1.5">
          <span>₦0</span>
          <span>₦{priceRange.toLocaleString()}</span>
        </div>
      </div>

      {/* Section buttons */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Section</h3>
        <div className="flex flex-col gap-1">
          {SECTIONS.map((sec) => (
            <button
              key={sec}
              onClick={() => handleSidebarSection(sec)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === sec
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Explore Talents</h1>

      {/* ── Search + dropdowns row ── */}
      {/* Mobile: search full-width, dropdowns side-by-side below */}
      {/* sm+   : everything in one row                           */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">

        {/* Search input */}
        <div className="relative w-full sm:flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search talents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdowns — side by side on mobile, inline on sm+ */}
        <div className="flex gap-3 w-full sm:w-auto">

          {/* Category dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={categoryDropdown}
              onChange={(e) => handleCategoryDropdown(e.target.value)}
              className="appearance-none w-full sm:w-48 border border-gray-300 rounded-lg pl-4 pr-8 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Section dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sectionDropdown}
              onChange={(e) => handleSectionDropdown(e.target.value)}
              className="appearance-none w-full sm:w-44 border border-gray-300 rounded-lg pl-4 pr-8 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 cursor-pointer"
            >
              <option value="All Sections">All Sections</option>
              {SECTIONS.filter((s) => s !== "All").map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Mobile filter button (visible below lg) ── */}
      <div className="lg:hidden mt-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M3 6h18M7 12h10M11 18h2" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-white w-72 h-full overflow-y-auto p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-500 hover:text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* ── Main: sidebar + grid ── */}
      <div className="flex gap-8 mt-8">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <SidebarContent />
        </aside>

        {/* Right column */}
        <div className="flex-1 min-w-0">

          {/* Results count + active filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{filteredTalents.length}</span>{" "}
              talent{filteredTalents.length !== 1 ? "s" : ""} found
            </p>

            {/* Removable filter chips */}
            <div className="flex flex-wrap gap-2">
              {activeCategory !== "All" && (
                <button onClick={() => handleSidebarCategory("All")} className="flex items-center gap-1.5 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700">
                  {activeCategory}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
              {activeSection !== "All" && (
                <button onClick={() => handleSidebarSection("All")} className="flex items-center gap-1.5 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700">
                  {activeSection}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
              {priceRange < MAX_PRICE && (
                <button onClick={() => setPriceRange(MAX_PRICE)} className="flex items-center gap-1.5 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700">
                  ≤ ₦{priceRange.toLocaleString()}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          {/* Grid or empty state */}
          {filteredTalents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-4">🎭</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">No talents found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import TalentCard from "./TalentCard";
import { ALL_TALENTS } from "../data/talents";
import "aos/dist/aos.css";
import Aos from "aos";

// Show first 4 talents on the home page
const FEATURED = ALL_TALENTS.slice(0, 4);

export default function FeaturedTalents() {

   useEffect(() => {
      Aos.init({
      })
   }, [])
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14" data-aos ="fade-up" data-aos-duration = "800" >

      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Talents</h2>
        <p className="text-gray-500 text-base">Top-rated professionals ready for your next project</p>
      </div>

      {/* 4-column grid: 1 col mobile → 2 col sm → 4 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

    </section>
  );
}

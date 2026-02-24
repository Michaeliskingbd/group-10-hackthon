import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import FeaturedTalents from "./components/FeaturedTalents";
import Explore         from "./components/Explore";
import TalentProfile   from "./components/TalentProfile";
import Messages        from "./components/Messages";
import Payment         from "./components/Payment";

// ── Home page = Hero + Featured Talents ───────────────────────────────────────
function Home() {
  return (
    <>
      {/* <Hero />
      <FeaturedTalents /> */}
    </>
  );
}

// ── Root app with routing ─────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">

        {/* Navbar is always visible on every page */}
        <Navbar />

        <Routes>
          {/* / → Home (Hero + Featured) */}
          {/* <Route path="/"           element={<Home />} /> */}

          {/* /explore → full explore page with filters */}
          <Route path="/explore"    element={<Explore />} />

          {/* /talent/:id → individual talent profile
          <Route path="/talent/:id" element={<TalentProfile />} />

           <Route path="/messages"    element={<Messages />} />
          <Route path="/payment"     element={<Payment />} /> */}
        </Routes>

      </div>
    </BrowserRouter>
  );
}

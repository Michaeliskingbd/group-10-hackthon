import React, { useState } from 'react';
import { FiSearch, FiMapPin } from "react-icons/fi";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const goto = () => {
    navigate('/form')
    window.scroll(0,0)
  }

  return (
    <div className="antialiased font-sans">
    
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
   
          <div className="flex items-center gap-3">
            <div className="bg-teal-700 text-white font-bold text-lg h-10 w-10 flex items-center justify-center rounded-xl">
              SL
            </div>
            <p className="text-[#1C2534] text-xl font-semibold tracking-tight">
              StageLink
            </p>
          </div>

     
          <ul className="hidden lg:flex gap-8 font-medium text-gray-600">
            <li className="cursor-pointer hover:text-teal-700 transition">Explore Talents</li>
            <li className="cursor-pointer hover:text-teal-700 transition">Categories</li>
            <li className="cursor-pointer hover:text-teal-700 transition">How It Works</li>
          </ul>

          <div className="hidden lg:flex gap-4 items-center">
            <button className="font-semibold text-gray-700 hover:text-teal-700 transition">Log In</button>
            <button onClick={goto} className="bg-[#1C2534] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition">
              Create Profile
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
              {menuOpen ? (
                <IoMdClose className="text-3xl" />
              ) : (
                <IoMdMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>

    
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl px-6 py-8 space-y-8">
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              <li className="cursor-pointer hover:text-teal-700">Explore Talents</li>
              <li className="cursor-pointer hover:text-teal-700">Categories</li>
              <li className="cursor-pointer hover:text-teal-700">How It Works</li>
            </ul>

            <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
              <button className="text-left font-semibold text-gray-700  hover:bg-teal-700 hover:text-white transition">Log In</button>
              <button className="bg-teal-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-teal-700/20">
                Create Profile
              </button>
            </div>
          </div>
        )}
      </header>

   
      <section className="relative min-h-[calc(100vh-72px)] bg-[url('https://stage-link-talent.lovable.app/assets/hero-image-BtNdPGF2.jpg')] bg-cover bg-center">
       
        <div className="absolute inset-0 bg-[#2A7282]/85 z-0"></div>

        <div className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-72px)] px-6 text-white text-center">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block">
              <p className="border border-white/30 px-4 py-1 rounded-full backdrop-blur-md text-sm md:text-base">
                Trusted by 2,000+ performers worldwide
              </p>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight">
              Discover & Hire <br />
              <span className="text-teal-200">World-Class Talent</span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-100">
              StageLink connects event organizers, brands, and sponsors with
              verified performers through a secure, professional marketplace.
            </p>

            <div className="mt-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row p-2 gap-2">
              <div className="relative flex-1 group">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600" />
                <input
                  type="text"
                  placeholder="Search by category or name"
                  className="w-full py-4 pl-12 pr-4 outline-none text-gray-800"
                />
              </div>

              <div className="relative flex-1 border-t md:border-t-0 md:border-l border-gray-100 group">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full py-4 pl-12 pr-4 outline-none text-gray-800"
                />
              </div>

              <button className="bg-teal-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-800 transition-all active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
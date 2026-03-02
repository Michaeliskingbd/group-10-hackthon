import React from "react";
import { FiShield, FiMessageSquare } from "react-icons/fi";
import { FaCreditCard } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-[#1e2a3b] text-white">

     
      <div className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Safety, Our Priority
          </h2>
          <p className="text-gray-300">
            All communication, agreements, and payments happen securely within StageLink.
          </p>
        </div>

       
        <div className="grid md:grid-cols-3 gap-8">
          
          
          <div className="bg-[#26344a] p-8 rounded-xl text-center">
            <FiShield className="text-yellow-400 mx-auto mb-4" size={30} />
            <h3 className="font-semibold text-lg mb-2">
              Secure Environment
            </h3>
            <p className="text-gray-300 text-sm">
              Verified profiles and monitored interactions keep you safe.
            </p>
          </div>

         
          <div className="bg-[#26344a] p-8 rounded-xl text-center">
            <FiMessageSquare className="text-yellow-400 mx-auto mb-4" size={30} />
            <h3 className="font-semibold text-lg mb-2">
              In-Platform Messaging
            </h3>
            <p className="text-gray-300 text-sm">
              All negotiations happen inside StageLink. No external contact needed.
            </p>
          </div>

          
          <div className="bg-[#26344a] p-8 rounded-xl text-center">
            <FaCreditCard className="text-yellow-400 mx-auto mb-4" size={30} />
            <h3 className="font-semibold text-lg mb-2">
              Protected Payments
            </h3>
            <p className="text-gray-300 text-sm">
              Funds are held securely until both parties confirm completion.
            </p>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-600"></div>

      
      <div className="px-6 py-14 max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

       
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-400 text-black font-bold w-9 h-9 flex items-center justify-center rounded-full">
              SL
            </div>
            <h3 className="text-xl font-semibold">StageLink</h3>
          </div>
          <p className="text-gray-300 text-sm">
            The trusted marketplace for discovering, hiring, and sponsoring talented individuals.
          </p>
        </div>

        
        <div>
          <h4 className="font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Explore Talents</li>
            <li className="hover:text-white cursor-pointer">Become a Talent</li>
            <li className="hover:text-white cursor-pointer">How It Works</li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Trust & Safety</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

       
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-gray-300 text-sm">
            hello@stagelink.com
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;

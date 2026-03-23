import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar          from "./components/Navbar";
import Hero            from "./components/Hero";
import FeaturedTalents from "./components/FeaturedTalents";
import Explore         from "./components/Explore";
import TalentProfile   from "./components/TalentProfile";
import Messages        from "./components/Messages";
import Payment         from "./components/Payment";
import FooterSection from "./component/FooterSection";
import Howitworks from "./component/Howitworks";
import TalentCard from "./components/TalentCard";
import HomePage from "./page/HomePage";
import ProfileForm from "./components/ProfileStep/ProfileForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import TalentDashboard from "./components/TalentDashboard";


function Home() {
  return (
    <>
     <Navbar />
      <Hero />
      <FeaturedTalents />
      <HomePage />
       <Howitworks />
        <FooterSection />
    </>
  );
}


export default function App() {
  return (
    <div>
    <BrowserRouter>
    
       
       
        <Routes>
        
          <Route path="/"  element={<Home />} />
          <Route path="/explore"  element={<Explore />} />
          <Route path="/talent/:id" element={<TalentProfile />} />
          <Route path="/talentcard" element={<TalentCard />} />
           <Route path="/messages"  element={<Messages />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/form" element={<ProfileForm />} />
          <Route path="/howitworks" element={<Howitworks />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/TalentDashboard" element={<TalentDashboard />} />


        </Routes>
       
      
   
    </BrowserRouter>
       
       </div>
  );
}
 
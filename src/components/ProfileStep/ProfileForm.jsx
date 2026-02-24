import React, { useState } from "react";
// Import your sub-components
import BasicInfoView from "./BasicInfo";
import MediaView from "./MediaUpload";
import AboutView from "./About";
import ContactPricingView from "./Pricing";

const steps = ["Basic Info", "Media", "About", "Contact & Pricing"];

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for all form fields
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    stageName: "",
    category: "",
    customCategory: "",
    location: "",
    // Media
    profilePicture: null,
    performanceVideo: null,
    // About
    bio: "",
    description: "",
    tags: "",
    // Contact & Pricing
    phone: "",
    price: "",
    availability: ""
  });

  // Helper to update state from child components
  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  /**
   * Validation Logic
   * Checks if mandatory fields are filled for the current step
   */
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        // Basic Info mandatory: Full Name, Category, and Location
        return formData.fullName.trim() !== "" && 
               formData.category !== "" && 
               formData.location.trim() !== "";
      case 2:
        // Media is often optional, but you can require a Profile Picture here
        return true; 
      case 3:
        // About mandatory: Bio (at least 10 chars)
        return formData.bio.trim().length >= 10;
      case 4:
        // Pricing mandatory: Phone and Price
        return formData.phone.trim() !== "" && formData.price.trim() !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === steps.length) {
        setIsSubmitted(true);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // --- SUCCESS VIEW ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Submitted!</h2>
          <p className="text-gray-500 mb-8">
            Your talent profile has been successfully created. You are now ready to get discovered!
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-[#2D7A8B] text-white rounded-2xl font-bold hover:bg-[#236371] transition-all shadow-lg shadow-[#2D7A8B]/20"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-[#111827]">
            Create Your Talent Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Complete the steps below to get discovered
          </p>
        </div>

        {/* Progress Bar (Stepper) */}
        <div className="flex items-center gap-4 mb-12">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-left">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentStep >= index + 1 ? "bg-[#2D7A8B]" : "bg-gray-200"
                }`}
              />
              <p
                className={`text-xs mt-3 font-medium ${
                  currentStep >= index + 1 ? "text-[#2D7A8B]" : "text-gray-400"
                }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Form Card Content */}
        <div className="bg-white rounded-[4%] shadow-sm border border-gray-100 p-8 md:p-10 mb-8">
          {currentStep === 1 && <BasicInfoView formData={formData} updateFields={updateFields} />}
          {currentStep === 2 && <MediaView formData={formData} updateFields={updateFields} />}
          {currentStep === 3 && <AboutView formData={formData} updateFields={updateFields} />}
          {currentStep === 4 && <ContactPricingView formData={formData} updateFields={updateFields} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className={`flex items-center text-gray-400 font-semibold hover:text-gray-800 transition-colors ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            <span className="mr-2">←</span> Back
          </button>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              Save Draft
            </button>
            <button
              onClick={handleNext}
              disabled={!validateCurrentStep()}
              className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all shadow-md ${
                validateCurrentStep() 
                  ? "bg-[#2D7A8B] text-white hover:bg-[#236371] shadow-[#2D7A8B]/10" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {currentStep === steps.length ? (
                <span className="flex items-center">✓ Submit Profile</span>
              ) : (
                <span className="flex items-center">Next <span className="ml-2">→</span></span>
              )}
            </button>
          </div>
        </div>
        
        {/* Simple validation warning message */}
        {!validateCurrentStep() && (
          <p className="text-right text-xs text-red-400 mt-2 italic">
            * Please fill in all required fields to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
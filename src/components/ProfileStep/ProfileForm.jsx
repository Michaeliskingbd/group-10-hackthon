import React, { useState } from "react";
// Import your sub-components
import BasicInfoView from "./BasicInfo";
import MediaView from "./MediaUpload";
import AboutView from "./About";
import ContactPricingView from "./Pricing";
import { Navigate, useNavigate } from "react-router-dom";

const steps = ["Basic Info", "Media", "About", "Contact & Pricing"];

// --- UPDATED CATEGORIES ---
const CATEGORIES = [
  "All",
  "Acting",
  "Singing",
  "Chanting",
  "Dancing",
  "Playing Musical Instruments",
  "Comedy",
  "Painting",
  "Storytelling",
  "Scriptwriting",
  "Running",
  "Swimming",
  "Football",
  "Basketball",
  "Yoga",
].map((cat) => ({ label: cat, value: cat.toLowerCase().replace(/\s+/g, "-") }));

const CURRENCIES = [
  { label: "USD ($)", value: "USD", symbol: "$", min: 10 },
  { label: "EUR (€)", value: "EUR", symbol: "€", min: 9 },
  { label: "NGN (₦)", value: "NGN", symbol: "₦", min: 10000 },
  { label: "GBP (£)", value: "GBP", symbol: "£", min: 8 },
];

const TalentProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previews, setPreviews] = useState({ photo: null, video: null });

   const navigate = useNavigate()

  const back = () => {
     navigate('/TalentDashboard')
     window.scroll(0,0)
  }

  // State for all form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    stageName: "", // Added
    email: "",
    category: null,
    country: null,
    city: null,
    profilePicture: null,
    performanceVideo: null,
    bio: "",
    description: "",
    tags: "", // Added
    phone: "",
    currency: CURRENCIES[0],
    hourlyRate: "",
    availability: "", // Added
  });

  const updateFields = (fields) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  // --- LOGIC: Media Handling with Full Visibility ---
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "photo") {
      if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
      updateFields({ profilePicture: file });
      setPreviews((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    } else {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 90)
          return alert("Video must be under 1 minute 30 seconds");
        updateFields({ performanceVideo: file });
        setPreviews((prev) => ({ ...prev, video: URL.createObjectURL(file) }));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          validateEmail(formData.email) &&
          formData.country &&
          formData.city &&
          formData.category
        );
      case 2:
        return formData.profilePicture && formData.performanceVideo;
      case 3:
        return formData.bio.length >= 10 && formData.description.length >= 20;
      case 4:
        return (
          formData.phone &&
          parseFloat(formData.hourlyRate) >= formData.currency.min
        );
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Submitted!
          </h2>
          <p className="text-gray-500 mb-8">
            Your talent profile has been successfully created.
          </p>
          <button 
            onClick={back}
            className="w-full py-4 bg-[#2D7A8B] text-white rounded-2xl font-bold hover:bg-[#236371] transition-all shadow-lg shadow-[#2D7A8B]/20"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center gap-4 mb-12">
          {steps.map((label, index) => (
            <div key={index} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-all ${currentStep >= index + 1 ? "bg-[#2D7A8B]" : "bg-gray-200"}`}
              />
              <p
                className={`text-[10px] uppercase mt-3 font-bold ${currentStep >= index + 1 ? "text-[#2D7A8B]" : "text-gray-400"}`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 mb-8">
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  className="w-full p-4 border rounded-xl"
                  value={formData.firstName}
                  onChange={(e) => updateFields({ firstName: e.target.value })}
                />
                <input
                  placeholder="Last Name"
                  className="w-full p-4 border rounded-xl"
                  value={formData.lastName}
                  onChange={(e) => updateFields({ lastName: e.target.value })}
                />
              </div>
              <input
                placeholder="Stage Name"
                className="w-full p-4 border rounded-xl"
                value={formData.stageName}
                onChange={(e) => updateFields({ stageName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border rounded-xl"
                value={formData.email}
                onChange={(e) => updateFields({ email: e.target.value })}
              />
              <Select
                placeholder="Select Category"
                options={CATEGORIES}
                value={formData.category}
                onChange={(val) => updateFields({ category: val })}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  placeholder="Country"
                  options={Country.getAllCountries().map((c) => ({
                    label: `${c.flag} ${c.name}`,
                    value: c.isoCode,
                  }))}
                  value={formData.country}
                  onChange={(val) => updateFields({ country: val, city: null })}
                />
                <Select
                  placeholder="City"
                  isDisabled={!formData.country}
                  options={
                    formData.country
                      ? City.getCitiesOfCountry(formData.country.value).map(
                          (c) => ({ label: c.name, value: c.name }),
                        )
                      : []
                  }
                  value={formData.city}
                  onChange={(val) => updateFields({ city: val })}
                />
              </div>
            </div>
          )}

          {/* STEP 2: MEDIA PORTFOLIO (Fixed Aspect Ratio) */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Media Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative border-2 border-dashed rounded-3xl p-4 bg-gray-50 text-center">
                  <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    Profile Photo
                  </p>
                  <div className="h-64 flex items-center justify-center bg-black rounded-2xl overflow-hidden mb-2">
                    {previews.photo ? (
                      <img
                        src={previews.photo}
                        className="max-h-full max-w-full object-contain"
                        alt="Preview"
                      />
                    ) : (
                      <span className="text-gray-400">
                        Click to upload photo
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "photo")}
                  />
                </div>

                <div className="relative border-2 border-dashed rounded-3xl p-4 bg-gray-50 text-center">
                  <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    Showreel (1:30s)
                  </p>
                  <div className="h-64 flex items-center justify-center bg-black rounded-2xl overflow-hidden mb-2">
                    {previews.video ? (
                      <video
                        src={previews.video}
                        className="max-h-full max-w-full object-contain"
                        controls
                      />
                    ) : (
                      <span className="text-gray-400">
                        Click to upload video
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ABOUT */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About & Experience</h2>
              <textarea
                maxLength={150}
                placeholder="Bio (Max 150 chars)"
                className="w-full p-4 border rounded-xl h-24"
                value={formData.bio}
                onChange={(e) => updateFields({ bio: e.target.value })}
              />
              <textarea
                maxLength={1000}
                placeholder="Full Description (Max 1000 chars)"
                className="w-full p-4 border rounded-xl h-40"
                value={formData.description}
                onChange={(e) => updateFields({ description: e.target.value })}
              />
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                  Tags (comma separated)
                </label>
                <input
                  placeholder="e.g. soulful, energetic, professional"
                  className="w-full p-4 border rounded-xl"
                  value={formData.tags}
                  onChange={(e) => updateFields({ tags: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & PRICING */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Logistics</h2>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                  Phone Number
                </label>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={formData.phone}
                  onChange={(val) => updateFields({ phone: val })}
                  className="flex gap-2 p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                  Availability
                </label>
                <input
                  placeholder="e.g. Weekends only, Available 24/7"
                  className="w-full p-4 border rounded-xl"
                  value={formData.availability}
                  onChange={(e) =>
                    updateFields({ availability: e.target.value })
                  }
                />
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border">
                <label className="text-xs font-bold text-gray-400 mb-4 block uppercase">
                  Rate Configuration
                </label>
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <Select
                      options={CURRENCIES}
                      value={formData.currency}
                      onChange={(val) => updateFields({ currency: val })}
                    />
                  </div>
                  <input
                    type="number"
                    placeholder={`Min ${formData.currency.min}`}
                    className="flex-1 p-4 border rounded-xl"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      updateFields({ hourlyRate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className={`font-semibold text-gray-400 ${currentStep === 1 ? "invisible" : ""}`}
          >
            ← Back
          </button>
          <button
            disabled={!validate()}
            onClick={() =>
              currentStep === 4
                ? setIsSubmitted(true)
                : setCurrentStep((prev) => prev + 1)
            }
            className={`px-10 py-4 rounded-2xl font-bold transition-all ${validate() ? "bg-[#2D7A8B] text-white shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {currentStep === 4 ? "✓ Submit Profile" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentProfileForm;

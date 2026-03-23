import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_TALENTS } from "../data/talents";

// Renders 1–5 filled/empty stars
function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? "fill-yellow-400" : "fill-gray-200"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Pin icon
function PinIcon() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function TalentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const talent  = ALL_TALENTS.find((t) => String(t.id) === id);
  const similar = ALL_TALENTS.filter((t) => String(t.id) !== id).slice(0, 3);

  // Not found state
  if (!talent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-5xl mb-4">🎭</p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Talent not found</h2>
        <button
          onClick={() => navigate("/explore")}
          className="mt-4 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const goTo = (nextId) => {
    navigate(`/talent/${nextId}`);
    window.scrollTo(0, 0);
  };

  const goToMessages = () => {
    navigate("/messages", { state: { talentName: talent.name } });
  };

  const goToPayment = () => {
    navigate("/payment", { state: { talentName: talent.name, type: "hire" } });
  };

  
  const [videoFile, setVideoFile]   = useState(null);   
  const [videoURL, setVideoURL]     = useState(null);   
  const [isPlaying, setIsPlaying]   = useState(false);  
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoURL(URL.createObjectURL(file)); 
    setIsPlaying(false);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoURL(null);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ════ LEFT SIDEBAR ════ */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* Profile photo */}
              <img
                src={talent.image}
                alt={talent.name}
                className="w-full h-72 object-cover object-top"
              />

              <div className="p-5">
                {/* Name */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{talent.name}</h1>

                {/* Badge + location */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${talent.badgeColor}`}>
                    {talent.badge || "Performer"}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <PinIcon />
                    <span>{talent.location}</span>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">{talent.rating}</span>
                  <span className="text-xs text-gray-400">(1 review)</span>
                </div>

                {/* Pricing text */}
                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-800">Contact for pricing</p>
                  <p className="text-xs text-gray-400 mt-0.5">Available for bookings</p>
                </div>

                {/* Contact → Messages page */}
                <button
                  onClick={goToMessages}
                  className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm py-3 rounded-xl mb-3 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Contact
                </button>

                {/* Hire/Sponsor → Payment page */}
                <button
                  onClick={goToPayment}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm py-3 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8L2 7h20l-6-4z" />
                  </svg>
                  Hire / Sponsor
                </button>
              </div>
            </div>
          </div>

          {/* ════ RIGHT CONTENT ════ */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Performance Reel */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

              {/* Header row */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Performance Reel</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Upload a highlight video for this talent</p>
                </div>
                {/* Remove button — only shows when a video is uploaded */}
                {videoFile && (
                  <button
                    onClick={handleRemoveVideo}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove
                  </button>
                )}
              </div>

              {/* Video area */}
              {videoURL ? (
                // ── Uploaded video player ──
                <div className="relative bg-black">
                  <video
                    src={videoURL}
                    className="w-full max-h-72 object-contain"
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {/* File name badge */}
                  <div className="px-6 py-3 flex items-center gap-2 border-t border-gray-100">
                    <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span className="text-xs text-gray-600 truncate">{videoFile?.name}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0 ml-auto">
                      {videoFile ? (videoFile.size / (1024 * 1024)).toFixed(1) + " MB" : ""}
                    </span>
                  </div>
                </div>
              ) : (
                // ── Upload drop zone ──
                <label className="flex flex-col items-center justify-center min-h-[220px] mx-6 mb-6 border-2 border-dashed border-gray-200 hover:border-teal-400 rounded-2xl cursor-pointer transition-colors group">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                  {/* Upload icon */}
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-teal-50 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 transition-colors">
                    Click to upload a video
                  </p>
                  <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI, WebM supported</p>
                </label>
              )}
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                This talented performer brings years of professional experience to every event.
                Known for captivating audiences and delivering exceptional performances tailored
                to each occasion.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Available for corporate events, private functions, festivals, and brand activations worldwide.
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Reviews</h2>
              <div className="space-y-5">

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">Event Planner</p>
                    <Stars count={5} />
                  </div>
                  <p className="text-sm text-gray-500">
                    An outstanding performer who exceeded all expectations. Professional and reliable.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">Brand Manager</p>
                    <Stars count={5} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Incredible stage presence and very easy to work with. Would book again without hesitation.
                  </p>
                </div>

              </div>
            </div>

            {/* Similar Talents */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Similar Talents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similar.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => goTo(t.id)}
                  >
                    {/* Image */}
                    <div className="h-44 overflow-hidden">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{t.name}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-1 flex-shrink-0">{t.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                        <PinIcon />
                        <span className="truncate">{t.location}</span>
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3">{t.bio}</p>
                      <button className="w-full text-xs font-semibold border border-gray-300 rounded-lg py-2 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

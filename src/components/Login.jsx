import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Google colour icon ────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" className="flex-shrink-0">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.4 35.4 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.4 36.4 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.3l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}


function Spinner({ light }) {
  return (
    <span className={`inline-block w-4 h-4 rounded-full border-2 animate-spin ${
      light ? "border-white/30 border-t-white" : "border-teal-200 border-t-teal-700"
    }`} />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();

  const [tab,      setTab]      = useState("email");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!email)                           e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email";
    if (!password)                        e.password = "Password is required";
    else if (password.length < 6)         e.password = "Min 6 characters";
    return e;
  };

  const handleEmailLogin = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1800);
  };

  const goto = () => {
    navigate("/form")
    window.scroll(0,0)
  }

  const TD = () => {
    navigate("/TalentDashboard")
    window.scroll(0,0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-white to-blue-50 px-4 py-10 relative overflow-hidden">

      {/* Decorative blobs — pure Tailwind, zero JS */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-teal-100 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-100 opacity-40 blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl shadow-teal-900/5 px-8 py-10">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center">
            <span className="text-white text-sm font-bold tracking-wide">SL</span>
          </div>
          <span className="text-gray-900 font-bold text-lg tracking-tight">StageLink</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-7">Sign in to discover and book top talent</p>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1 mb-7">
          <button
            onClick={() => setTab("email")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === "email"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setTab("google")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === "google"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Google
          </button>
        </div>

        {/* EMAIL FORM */}
        {tab === "email" && (
          <form onSubmit={handleEmailLogin} noValidate className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Email address
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50 outline-none transition-all focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-teal-700 font-semibold hover:text-teal-900 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50 outline-none transition-all focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${
                    errors.password ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-0.5"
                >
                  {showPass ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800
                disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-bold
                text-sm tracking-wide transition-all flex items-center justify-center gap-2
                shadow-md shadow-teal-900/20 hover:shadow-lg hover:shadow-teal-900/25
                hover:-translate-y-0.5 active:translate-y-0"
                onClick={TD}
            >
              {loading ? <Spinner light /> : "Sign in"}
            </button>
          </form>
        )}

        {/* GOOGLE PANEL */}
        {tab === "google" && (
          <div className="flex flex-col gap-5">
            <p className="text-sm text-gray-500 leading-relaxed">
              Sign in instantly using your Google account. No password needed.
            </p>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4
                rounded-xl border border-gray-200 bg-white hover:border-teal-400
                hover:shadow-md hover:shadow-teal-900/10 text-sm font-semibold
                text-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : <><GoogleIcon /> Continue with Google</>}
            </button>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              We only access your name and email. We never post on your behalf.
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 font-semibold">or</span>
          <span className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Alternate method */}
        {tab === "email" ? (
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4
              rounded-xl border border-gray-200 bg-white hover:border-teal-400
              hover:shadow-md hover:shadow-teal-900/10 text-sm font-semibold
              text-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner /> : <><GoogleIcon /> Continue with Google</>}
          </button>
        ) : (
          <button
            onClick={() => setTab("email")}
            className="w-full py-3 rounded-xl border border-teal-600 text-teal-700
              font-semibold text-sm hover:bg-teal-50 transition-colors"
          >
            Sign in with Email
          </button>
        )}

        {/* Sign up */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <p onClick={goto} className="text-teal-700 font-bold hover:text-teal-900 transition-colors">
            Create on e free
          </p>
        </p>
      </div>

      {/* Footer */}
      <p className="relative z-10 mt-6 text-xs text-gray-400 text-center">
        By signing in you agree to StageLink's{" "}
        <a href="#" className="underline hover:text-gray-600 transition-colors">Terms</a>
        {" "}&amp;{" "}
        <a href="#" className="underline hover:text-gray-600 transition-colors">Privacy Policy</a>
      </p>
    </div>
  );
}

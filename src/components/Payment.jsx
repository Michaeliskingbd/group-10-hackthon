import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ── Payment method options ─────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    id: "crypto",
    label: "Crypto",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M7 11C7 11 6 17 12 17C12 17 18 17 19 11C19 11 20 6 14 6H9C9 6 7 6 7 11Z" />
        <path d="M5 15C5 15 4 20 9 20H14" />
      </svg>
    ),
  },
];

// ── Card form fields ──────────────────────────────────────────────────────────
function CardForm() {
  return (
    <div className="space-y-3 mt-4">
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-600 mb-1 block">Expiry Date</label>
          <input
            type="text"
            placeholder="MM / YY"
            maxLength={7}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-600 mb-1 block">CVV</label>
          <input
            type="text"
            placeholder="123"
            maxLength={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}

// ── Crypto form ───────────────────────────────────────────────────────────────
function CryptoForm() {
  const [coin, setCoin] = useState("BTC");
  return (
    <div className="space-y-3 mt-4">
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Select Coin</label>
        <div className="flex gap-2 flex-wrap">
          {["BTC", "ETH", "USDT", "BNB", "SOL"].map((c) => (
            <button
              key={c}
              onClick={() => setCoin(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                coin === c
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-white text-gray-600 border-gray-300 hover:border-teal-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Wallet Address</label>
        <input
          type="text"
          placeholder={`Paste your ${coin} wallet address`}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono"
        />
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-xs text-yellow-700">
        ⚠️ Make sure your wallet supports <strong>{coin}</strong>. Sending to the wrong address is irreversible.
      </div>
    </div>
  );
}

// ── Bank Transfer form ────────────────────────────────────────────────────────
function BankForm() {
  return (
    <div className="space-y-3 mt-4">
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Account Name</label>
        <input type="text" placeholder="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Account Number</label>
        <input type="text" placeholder="0123456789" maxLength={10} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Bank Name</label>
        <input type="text" placeholder="e.g. Access Bank" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
      </div>
    </div>
  );
}

// ── PayPal form ───────────────────────────────────────────────────────────────
function PayPalForm() {
  return (
    <div className="space-y-3 mt-4">
      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">PayPal Email</label>
        <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-xs text-blue-700">
        You will be redirected to PayPal to complete your payment securely.
      </div>
    </div>
  );
}


export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const talentName    = location.state?.talentName || "Talent";
  const isHireSponsor = location.state?.type === "hire";

  const serviceFee    = 80;

  const [amount, setAmount]  = useState("800");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [paid, setPaid]   = useState(false);

  const parsedAmount = parseFloat(amount) || 0;
  const total = parsedAmount + serviceFee;

  const handleConfirm = () => {
    if (!amount || parsedAmount <= 0) return;
    setPaid(true);
    setTimeout(() => navigate("/Dashboard"), 3000);
  };

  // ── Success screen ──
  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Confirmed!</h2>
        <p className="text-gray-500 text-sm">Your booking with {talentName} is confirmed.</p>
        <p className="text-gray-400 text-xs mt-1">Redirecting to your dashboard...</p>
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to Messages
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">
        {isHireSponsor ? "Hire / Sponsor" : "Confirm & Pay"}
      </h1>
      <p className="text-gray-400 text-sm mb-8">Review the agreement details before confirming payment</p>

      {/* ── Job Summary ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-5">Job Summary</h2>

        <div className="space-y-3 pb-5 border-b border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Talent</span>
            <span className="font-semibold text-gray-900">{talentName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Event</span>
            <span className="text-gray-700">Corporate Gala</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Date</span>
            <span className="text-gray-700">March 15, 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Duration</span>
            <span className="text-gray-700">45 minutes</span>
          </div>
        </div>

        {/* ── Amount input ── */}
        <div className="pt-5 pb-5 border-b border-gray-100">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
            Performance Fee (enter amount)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">$</span>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 text-sm text-gray-800 font-semibold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
          <div className="flex justify-between text-sm mt-3 text-gray-400">
            <span>Platform Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between pt-5">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-teal-700 text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Payment Method ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
        <h2 className="text-base font-bold text-gray-900 mb-4">Payment Method</h2>

        {/* Method selector */}
        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                selectedMethod === method.id
                  ? "border-teal-600 bg-teal-50 text-teal-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              <span className={selectedMethod === method.id ? "text-teal-700" : "text-gray-400"}>
                {method.icon}
              </span>
              {method.label}
            </button>
          ))}
        </div>

        {/* Dynamic form based on selected method */}
        {selectedMethod === "card"   && <CardForm />}
        {selectedMethod === "crypto" && <CryptoForm />}
        {selectedMethod === "bank"   && <BankForm />}
        {selectedMethod === "paypal" && <PayPalForm />}
      </div>

      {/* ── Confirm button ── */}
      <button
        onClick={handleConfirm}
        disabled={!amount || parsedAmount <= 0}
        className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl text-base transition-colors"
      >
        Confirm Payment — ${total.toFixed(2)}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4">
        By confirming, you agree to the StageLink terms of service and cancellation policy.
      </p>
    </div>
  );
}


import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Mock data ──────────────────────────────────────────────────────────────────
const USER = {
  name: "Amara Diallo",
  email: "amara@stagelink.io",
  role: "Vocalist",
  plan: "Pro",
  avatar: "AD",
  rating: 4.9,
  reviews: 38,
  location: "Lagos, Nigeria",
};

const STATS = [
  { label: "Gigs Received",  value: "18",   change: "+4 this month",   up: true,  icon: "calendar" },
  { label: "Total Earned",   value: "$9.4k", change: "+$1.2k this month", up: true, icon: "wallet"  },
  { label: "Profile Views",  value: "312",  change: "+58 this week",   up: true,  icon: "eye"      },
  { label: "Pending Offers", value: "5",    change: "3 need response", up: null,  icon: "clock"    },
];

const OFFERS = [
  { id: 1, client: "EventPro Lagos",  event: "Corporate Gala",    date: "Mar 15, 2026", amount: "$880",  status: "accepted"  },
  { id: 2, client: "WedCo Nigeria",   event: "Wedding Reception", date: "Apr 18, 2026", amount: "$1,200",status: "pending"   },
  { id: 3, client: "TechFest HQ",     event: "Product Launch",    date: "Apr 2, 2026",  amount: "$600",  status: "pending"   },
  { id: 4, client: "Royal Events",    event: "Award Night",       date: "Feb 5, 2026",  amount: "$750",  status: "completed" },
  { id: 5, client: "Afro Vibes Ltd",  event: "Music Festival",    date: "Jan 20, 2026", amount: "$950",  status: "completed" },
];

const REVIEWS = [
  { id: 1, client: "EventPro Lagos",  rating: 5, text: "Amara was absolutely phenomenal. The crowd loved every second of her performance.", date: "Feb 2026" },
  { id: 2, client: "Royal Events",    rating: 5, text: "Professional, punctual, and incredibly talented. Will book again without hesitation.", date: "Jan 2026" },
  { id: 3, client: "Afro Vibes Ltd",  rating: 4, text: "Great energy and stage presence. Highly recommended for any event.", date: "Jan 2026" },
];

const ACTIVITY = [
  { id: 1, text: "New offer from WedCo Nigeria",         time: "1h ago",  type: "offer"   },
  { id: 2, text: "TechFest HQ sent you an offer",        time: "3h ago",  type: "offer"   },
  { id: 3, text: "Payment of $880 received",             time: "1d ago",  type: "success" },
  { id: 4, text: "EventPro Lagos left you a 5★ review",  time: "2d ago",  type: "review"  },
  { id: 5, text: "Your profile was viewed 24 times today",time: "3d ago", type: "info"    },
];

// ── Icon map ───────────────────────────────────────────────────────────────────
const Icon = ({ name, cls = "w-5 h-5" }) => {
  const icons = {
    calendar: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    wallet:   <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>,
    eye:      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    clock:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    home:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    offers:   <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    reviews:  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    profile:  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    settings: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    messages: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    bell:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    menu:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
    close:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    up:       <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>,
    star:     <svg className={cls} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
    logout:   <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    check:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    x:        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    pin:      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  };
  return icons[name] || null;
};

// ── Status badge ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    accepted:  "bg-emerald-100 text-emerald-700",
    pending:   "bg-amber-100   text-amber-700",
    completed: "bg-gray-100    text-gray-600",
    declined:  "bg-red-100     text-red-600",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status] || map.pending}`}>
      {status}
    </span>
  );
};

// ── Star row ───────────────────────────────────────────────────────────────────
const Stars = ({ count }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Icon key={i} name="star" cls={`w-3.5 h-3.5 ${i <= count ? "text-amber-400" : "text-gray-200"}`} />
    ))}
  </div>
);

// ── Nav ────────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",  label: "Overview",     icon: "home"     },
  { id: "offers",    label: "Offers",       icon: "offers"   },
  { id: "reviews",   label: "Reviews",      icon: "reviews"  },
  { id: "profile",   label: "My Profile",   icon: "profile"  },
  { id: "messages",  label: "Messages",     icon: "messages" },
  { id: "settings",  label: "Settings",     icon: "settings" },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, open, setOpen, navigate }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-30 lg:z-auto
        h-screen flex-shrink-0 flex flex-col w-64
        bg-gray-950 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-wider">SL</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">StageLink</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <Icon name="close" cls="w-4 h-4" />
          </button>
        </div>

        {/* Talent profile pill */}
        <div className="mx-4 mt-5 mb-2 bg-white/5 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {USER.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{USER.name}</p>
              <p className="text-white/40 text-xs">{USER.role}</p>
            </div>
            <span className="ml-auto flex-shrink-0 text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full">
              {USER.plan}
            </span>
          </div>
          {/* Rating bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Icon key={i} name="star" cls={`w-3 h-3 ${i <= Math.round(USER.rating) ? "text-amber-400" : "text-white/10"}`} />
              ))}
            </div>
            <span className="text-white/60 text-xs font-semibold">{USER.rating}</span>
            <span className="text-white/30 text-xs ml-1">({USER.reviews} reviews)</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active === item.id
                  ? "bg-teal-500/15 text-teal-400"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon name={item.icon} cls="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.id === "offers" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
              )}
              {item.id === "messages" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 space-y-1 border-t border-white/5 pt-3">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <Icon name="logout" cls="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const colorMap = {
    calendar: "bg-teal-500/10  text-teal-500",
    wallet:   "bg-emerald-500/10 text-emerald-500",
    eye:      "bg-blue-500/10  text-blue-500",
    clock:    "bg-amber-500/10 text-amber-500",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[stat.icon]}`}>
          <Icon name={stat.icon} cls="w-5 h-5" />
        </div>
        {stat.up !== null && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
            <Icon name="up" cls={`w-3 h-3 ${stat.up ? "" : "rotate-180"}`} />
            {stat.up ? "Up" : "Down"}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-gray-900 tracking-tight mb-1">{stat.value}</p>
      <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
      <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
    </div>
  );
}

// ── Overview panel ─────────────────────────────────────────────────────────────
function OverviewPanel({ setActive }) {
  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="relative overflow-hidden bg-gray-950 rounded-2xl px-6 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-1">Talent Dashboard</p>
          <h2 className="text-white text-2xl font-black tracking-tight mb-1">
            Hey {USER.name.split(" ")[0]}, you're on fire 🔥
          </h2>
          <p className="text-white/40 text-sm">
            You have <span className="text-amber-400 font-bold">5 pending offers</span> — don't keep them waiting.
          </p>
        </div>
        <button
          onClick={() => setActive("offers")}
          className="relative z-10 flex-shrink-0 bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          Review Offers →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* Offers table + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent offers */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Offers</h3>
            <button onClick={() => setActive("offers")} className="text-xs text-teal-700 font-semibold hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Event</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {OFFERS.slice(0, 4).map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {o.client.split(" ").map(n => n[0]).join("").slice(0,2)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{o.client}</p>
                          <p className="text-xs text-gray-400">{o.amount}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{o.event}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs hidden md:table-cell">{o.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="px-6 py-4 space-y-4">
            {ACTIVITY.map((a) => {
              const dot = { offer: "bg-amber-500", success: "bg-emerald-500", review: "bg-blue-500", info: "bg-teal-500" }[a.type];
              return (
                <div key={a.id} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${dot}`} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-900">Reviews</h3>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
              <Icon name="star" cls="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-amber-700">{USER.rating} · {USER.reviews} reviews</span>
            </div>
          </div>
          <button onClick={() => setActive("reviews")} className="text-xs text-teal-700 font-semibold hover:underline">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
          {REVIEWS.map((r) => (
            <div key={r.id} className="px-6 py-5">
              <div className="flex items-center justify-between mb-2">
                <Stars count={r.rating} />
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-3">"{r.text}"</p>
              <p className="text-xs font-semibold text-gray-500">— {r.client}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Offers panel ───────────────────────────────────────────────────────────────
function OffersPanel({ navigate }) {
  const [filter, setFilter] = useState("all");
  const [offers, setOffers] = useState(OFFERS);

  const filtered = filter === "all" ? offers : offers.filter(o => o.status === filter);

  const handleAccept = (id) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: "accepted" } : o));
  };
  const handleDecline = (id) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: "declined" } : o));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-gray-50">
        <h3 className="font-bold text-gray-900 text-lg">All Offers</h3>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "accepted", "completed", "declined"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Event</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {o.client.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{o.client}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{o.event}</td>
                <td className="px-6 py-4 text-gray-500 text-xs hidden md:table-cell">{o.date}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 hidden lg:table-cell">{o.amount}</td>
                <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-6 py-4">
                  {o.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(o.id)}
                        className="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition-colors"
                        title="Accept"
                      >
                        <Icon name="check" cls="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDecline(o.id)}
                        className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                        title="Decline"
                      >
                        <Icon name="x" cls="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">No offers found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Reviews panel ──────────────────────────────────────────────────────────────
function ReviewsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div>
          <p className="text-4xl font-black text-gray-900">{USER.rating}</p>
          <Stars count={5} />
          <p className="text-sm text-gray-400 mt-1">{USER.reviews} total reviews</p>
        </div>
        <div className="flex-1 space-y-1.5 ml-6">
          {[5,4,3,2,1].map(n => {
            const count = REVIEWS.filter(r => r.rating === n).length;
            const pct   = Math.round((count / REVIEWS.length) * 100);
            return (
              <div key={n} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-2">{n}</span>
                <Icon name="star" cls="w-3 h-3 text-amber-400" />
                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {REVIEWS.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center">
                  {r.client.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.client}</p>
                  <Stars count={r.rating} />
                </div>
              </div>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile panel ──────────────────────────────────────────────────────────────
function ProfilePanel() {
  const [bio,      setBio]      = useState("Soulful Afrobeat vocalist with 8+ years of stage experience. Available for corporate events, weddings, festivals and more.");
  const [price,    setPrice]    = useState("800");
  const [category, setCategory] = useState("Singing");
  const [location, setLocation] = useState(USER.location);
  const [saved,    setSaved]    = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoFile,setVideoFile]= useState(null);

  const handleSave = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoURL(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h3 className="font-bold text-gray-900 text-lg">My Talent Profile</h3>

      {/* Profile card preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white text-xl font-bold flex items-center justify-center flex-shrink-0">
          {USER.avatar}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">{USER.name}</p>
          <p className="text-sm text-gray-400">{USER.role}</p>
          <div className="flex items-center gap-2 mt-1">
            <Stars count={5} />
            <span className="text-xs text-gray-500">{USER.rating} · {USER.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <Icon name="pin" cls="w-3 h-3" />
            {USER.location}
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-5">Edit Profile Details</h4>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all">
                {["Singing","Dancing","Comedy","DJ","MC","Spoken Word","Saxophone","Drumming"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Base Price ($)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bio</label>
            <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all resize-none" />
          </div>
          <button type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Performance reel upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h4 className="font-semibold text-gray-900">Performance Reel</h4>
            <p className="text-xs text-gray-400 mt-0.5">Upload a highlight video visible on your public profile</p>
          </div>
          {videoFile && (
            <button onClick={() => { setVideoFile(null); setVideoURL(null); }}
              className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <Icon name="x" cls="w-3 h-3" /> Remove
            </button>
          )}
        </div>
        {videoURL ? (
          <div className="bg-black">
            <video src={videoURL} className="w-full max-h-64 object-contain" controls />
            <div className="px-6 py-3 flex items-center gap-2 border-t border-gray-100">
              <span className="text-xs text-gray-600 truncate">{videoFile?.name}</span>
              <span className="text-xs text-gray-400 ml-auto flex-shrink-0">
                {videoFile ? (videoFile.size / (1024 * 1024)).toFixed(1) + " MB" : ""}
              </span>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center min-h-[180px] mx-6 mb-6 border-2 border-dashed border-gray-200 hover:border-teal-400 rounded-2xl cursor-pointer transition-colors group">
            <input type="file" accept="video/*" className="hidden" onChange={handleVideo} />
            <div className="w-12 h-12 bg-gray-100 group-hover:bg-teal-50 rounded-full flex items-center justify-center mb-3 transition-colors">
              <Icon name="eye" cls="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 transition-colors">Click to upload video</p>
            <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI, WebM</p>
          </label>
        )}
      </div>
    </div>
  );
}

// ── Settings panel ─────────────────────────────────────────────────────────────
function SettingsPanel() {
  const [name,  setName]  = useState(USER.name);
  const [email, setEmail] = useState(USER.email);
  const [saved, setSaved] = useState(false);
  const handleSave = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-bold text-gray-900 text-lg">Account Settings</h3>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-5">Personal Information</h4>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
          </div>
          <button type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-1">Current Plan</h4>
        <p className="text-sm text-gray-400 mb-4">You are on the <span className="text-teal-700 font-bold">Pro</span> plan.</p>
        <div className="flex gap-3">
          <div className="flex-1 border-2 border-teal-500 rounded-xl p-4">
            <p className="font-bold text-gray-900">Pro</p>
            <p className="text-2xl font-black text-teal-700 mt-1">$19<span className="text-sm font-medium text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-400 mt-2">Unlimited listings, priority visibility</p>
          </div>
          <div className="flex-1 border border-gray-200 rounded-xl p-4 opacity-60">
            <p className="font-bold text-gray-900">Elite</p>
            <p className="text-2xl font-black text-gray-700 mt-1">$49<span className="text-sm font-medium text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-400 mt-2">Featured placement, verified badge</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function TalentDashboard() {
  const navigate  = useNavigate();
  const [active,   setActive]   = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);

  const titles = {
    overview: "Dashboard",
    offers:   "Offers",
    reviews:  "Reviews",
    profile:  "My Profile",
    messages: "Messages",
    settings: "Settings",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={active} setActive={setActive} open={sideOpen} setOpen={setSideOpen} navigate={navigate} />

      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSideOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors">
              <Icon name="menu" cls="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-gray-900 tracking-tight">{titles[active]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
              <Icon name="bell" cls="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            <button
              onClick={() => setActive("profile")}
              className="hidden sm:flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Icon name="profile" cls="w-3.5 h-3.5" />
              Edit Profile
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {USER.avatar}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
          {active === "overview"  && <OverviewPanel setActive={setActive} />}
          {active === "offers"    && <OffersPanel navigate={navigate} />}
          {active === "reviews"   && <ReviewsPanel />}
          {active === "profile"   && <ProfilePanel />}
          {active === "settings"  && <SettingsPanel />}
          {active === "messages"  && (
            <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center">
                <Icon name="messages" cls="w-6 h-6 text-teal-600" />
              </div>
              <p className="font-bold text-gray-900">Your Messages</p>
              <p className="text-sm text-gray-400">Chat with clients who booked you</p>
              <button onClick={() => navigate("/messages")}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Open Messages
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

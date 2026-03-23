import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Mock data ──────────────────────────────────────────────────────────────────
const USER = {
  name: "Daredre O.",
  email: "daredre@stagelink.io",
  plan: "Pro",
  avatar: "DO",
  joinedDate: "Jan 2025",
};

const STATS = [
  { label: "Bookings Made",    value: "12",   change: "+3 this month",  up: true,  icon: "calendar" },
  { label: "Talents Saved",    value: "24",   change: "+7 this week",   up: true,  icon: "heart"     },
  { label: "Total Spent",      value: "$4.2k",change: "+$800 this month",up: true, icon: "wallet"    },
  { label: "Pending Offers",   value: "3",    change: "2 awaiting reply",up: null, icon: "clock"     },
];

const BOOKINGS = [
  { id: 1, talent: "Amara Diallo",  role: "Vocalist",    event: "Corporate Gala",    date: "Mar 15, 2026", amount: "$880",  status: "confirmed" },
  { id: 2, talent: "Carlos Rivera", role: "Comedian",    event: "Product Launch",    date: "Apr 2, 2026",  amount: "$600",  status: "pending"   },
  { id: 3, talent: "Yuki Tanaka",   role: "Dancer",      event: "Wedding Reception", date: "Apr 18, 2026", amount: "$1,200",status: "confirmed" },
  { id: 4, talent: "Leo Mensah",    role: "DJ",          event: "Birthday Bash",     date: "Feb 20, 2026", amount: "$500",  status: "completed" },
  { id: 5, talent: "Sade Okafor",   role: "MC",          event: "Award Night",       date: "Feb 5, 2026",  amount: "$750",  status: "completed" },
];

const SAVED = [
  { id: 1, name: "Zara Beats",    role: "Afrobeats DJ",    rating: 4.9, price: "$600/set",  img: "ZB" },
  { id: 2, name: "Emeka Flow",    role: "Spoken Word",     rating: 4.7, price: "$400/show", img: "EF" },
  { id: 3, name: "Tunde Vibes",   role: "Saxophonist",     rating: 4.8, price: "$550/hr",   img: "TV" },
];

const ACTIVITY = [
  { id: 1, text: "Booking confirmed for Amara Diallo",     time: "2h ago",   type: "success" },
  { id: 2, text: "Carlos Rivera viewed your offer",        time: "5h ago",   type: "info"    },
  { id: 3, text: "Payment of $880 processed",              time: "1d ago",   type: "success" },
  { id: 4, text: "New message from Yuki Tanaka",           time: "2d ago",   type: "message" },
  { id: 5, text: "Offer sent to Leo Mensah",               time: "3d ago",   type: "info"    },
];

// ── Icon components ────────────────────────────────────────────────────────────
const Icon = ({ name, cls = "w-5 h-5" }) => {
  const icons = {
    calendar: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    heart:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    wallet:   <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>,
    clock:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    home:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    booking:  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    saved:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    settings: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    messages: <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    explore:  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    bell:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    menu:     <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>,
    close:    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    up:       <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>,
    star:     <svg className={cls} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
    logout:   <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  };
  return icons[name] || null;
};

// ── Status badge ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    confirmed: "bg-emerald-100 text-emerald-700",
    pending:   "bg-amber-100  text-amber-700",
    completed: "bg-gray-100   text-gray-600",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status]}`}>
      {status}
    </span>
  );
};

// ── Nav items ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",  label: "Overview",  icon: "home"     },
  { id: "bookings",  label: "Bookings",  icon: "booking"  },
  { id: "saved",     label: "Saved",     icon: "saved"    },
  { id: "messages",  label: "Messages",  icon: "messages" },
  { id: "settings",  label: "Settings",  icon: "settings" },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, open, setOpen, navigate }) {
  return (
    <>
      {/* Backdrop — mobile only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-30 lg:z-auto
        h-screen lg:h-[calc(100vh-0px)]
        w-64 bg-gray-950 flex flex-col
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:flex-shrink-0
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

        {/* User pill */}
        <div className="mx-4 mt-5 mb-2 bg-white/5 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {USER.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{USER.name}</p>
            <p className="text-white/40 text-xs truncate">{USER.email}</p>
          </div>
          <span className="ml-auto flex-shrink-0 text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full">
            {USER.plan}
          </span>
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
              {item.id === "messages" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Explore + Logout */}
        <div className="px-3 pb-6 space-y-1 border-t border-white/5 pt-3">
          <button
            onClick={() => navigate("/explore")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon name="explore" cls="w-4 h-4" />
            Explore Talents
          </button>
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
function StatCard({ stat, delay }) {
  const colorMap = {
    calendar: "bg-teal-500/10  text-teal-500",
    heart:    "bg-pink-500/10  text-pink-500",
    wallet:   "bg-amber-500/10 text-amber-500",
    clock:    "bg-blue-500/10  text-blue-500",
  };
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
      style={{ animationDelay: `${delay}ms` }}
    >
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

      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gray-950 rounded-2xl px-6 py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-teal-400 text-xs font-bold tracking-widest uppercase mb-1">Good morning</p>
          <h2 className="text-white text-2xl font-black tracking-tight mb-1">
            Welcome back, {USER.name.split(" ")[0]} 👋
          </h2>
          <p className="text-white/40 text-sm">You have <span className="text-amber-400 font-bold">3 pending offers</span> waiting for reply.</p>
        </div>
        <button
          onClick={() => setActive("bookings")}
          className="relative z-10 flex-shrink-0 bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          View Offers →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} delay={i * 60} />)}
      </div>

      {/* Bookings + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent bookings — takes 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Bookings</h3>
            <button onClick={() => setActive("bookings")} className="text-xs text-teal-700 font-semibold hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Talent</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Event</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.slice(0, 4).map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {b.talent.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{b.talent}</p>
                          <p className="text-xs text-gray-400">{b.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{b.event}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs hidden md:table-cell">{b.date}</td>
                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed — 1/3 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="px-6 py-4 space-y-4">
            {ACTIVITY.map((a) => {
              const dot = { success: "bg-emerald-500", info: "bg-blue-500", message: "bg-teal-500" }[a.type];
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

      {/* Saved talents quick preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h3 className="font-bold text-gray-900">Saved Talents</h3>
          <button onClick={() => setActive("saved")} className="text-xs text-teal-700 font-semibold hover:underline">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
          {SAVED.map((t) => (
            <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {t.img}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 text-sm truncate">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="star" cls="w-3 h-3 text-amber-400" />
                  <span className="text-xs font-bold text-gray-700">{t.rating}</span>
                  <span className="text-xs text-gray-400 ml-auto">{t.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Bookings panel ─────────────────────────────────────────────────────────────
function BookingsPanel() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? BOOKINGS : BOOKINGS.filter(b => b.status === filter);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-gray-50">
        <h3 className="font-bold text-gray-900 text-lg">All Bookings</h3>
        <div className="flex gap-2 flex-wrap">
          {["all", "confirmed", "pending", "completed"].map((f) => (
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
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Talent</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Event</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Amount</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {b.talent.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{b.talent}</p>
                      <p className="text-xs text-gray-400">{b.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 hidden sm:table-cell">{b.event}</td>
                <td className="px-6 py-4 text-gray-500 text-xs hidden lg:table-cell">{b.date}</td>
                <td className="px-6 py-4 font-semibold text-gray-900 hidden md:table-cell">{b.amount}</td>
                <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">No bookings found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Saved panel ────────────────────────────────────────────────────────────────
function SavedPanel({ navigate }) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg">Saved Talents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {SAVED.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                {t.img}
              </div>
              <div>
                <p className="font-bold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="star" cls="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-sm font-bold text-gray-700">{t.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <span className="text-sm font-semibold text-teal-700">{t.price}</span>
              <button
                onClick={() => navigate("/explore")}
                className="text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings panel ─────────────────────────────────────────────────────────────
function SettingsPanel() {
  const [name,  setName]  = useState(USER.name);
  const [email, setEmail] = useState(USER.email);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="font-bold text-gray-900 text-lg">Account Settings</h3>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h4 className="font-semibold text-gray-900 mb-5">Profile Information</h4>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-gray-50 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all" />
          </div>
          <button type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
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
            <p className="text-2xl font-black text-teal-700 mt-1">$29<span className="text-sm font-medium text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-400 mt-2">Unlimited bookings, priority support</p>
          </div>
          <div className="flex-1 border border-gray-200 rounded-xl p-4 opacity-60">
            <p className="font-bold text-gray-900">Enterprise</p>
            <p className="text-2xl font-black text-gray-700 mt-1">$99<span className="text-sm font-medium text-gray-400">/mo</span></p>
            <p className="text-xs text-gray-400 mt-2">Team access, custom contracts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [active,    setActive]    = useState("overview");
  const [sideOpen,  setSideOpen]  = useState(false);

  const pageTitles = {
    overview: "Dashboard",
    bookings: "Bookings",
    saved:    "Saved Talents",
    messages: "Messages",
    settings: "Settings",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar
        active={active}
        setActive={setActive}
        open={sideOpen}
        setOpen={setSideOpen}
        navigate={navigate}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSideOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Icon name="menu" cls="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-gray-900 tracking-tight">
              {pageTitles[active]}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors">
              <Icon name="bell" cls="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" />
            </button>

            {/* Explore CTA */}
            <button
              onClick={() => navigate("/explore")}
              className="hidden sm:flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Icon name="explore" cls="w-3.5 h-3.5" />
              Find Talent
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {USER.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
          {active === "overview"  && <OverviewPanel setActive={setActive} />}
          {active === "bookings"  && <BookingsPanel />}
          {active === "saved"     && <SavedPanel navigate={navigate} />}
          {active === "messages"  && (
            <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center">
                <Icon name="messages" cls="w-6 h-6 text-teal-600" />
              </div>
              <p className="font-bold text-gray-900">Your Messages</p>
              <p className="text-sm text-gray-400">View all your talent conversations</p>
              <button
                onClick={() => navigate("/messages")}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Open Messages
              </button>
            </div>
          )}
          {active === "settings"  && <SettingsPanel />}
        </main>

      </div>
    </div>
  );
}

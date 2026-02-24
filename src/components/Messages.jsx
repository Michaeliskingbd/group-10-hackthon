import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Mock conversations — in a real app this would come from a backend
const CONVERSATIONS = [
  {
    id: 1,
    name: "Amara Diallo",
    role: "Vocalist",
    time: "2m ago",
    preview: "I'd love to perform at your event!",
    unread: true,
    messages: [
      { id: 1, from: "them", text: "Hi! Thanks for reaching out. I'd love to hear more about your event." },
      { id: 2, from: "me",   text: "We're organizing a corporate gala for 300 guests on March 15th. Would you be available?" },
      { id: 3, from: "them", text: "March 15th works perfectly for me! What's the venue and what type of performance are you looking for?" },
      { id: 4, from: "me",   text: "The venue is Grand Ballroom Hotel. We need a 45-minute set with a mix of jazz and soul." },
      { id: 5, from: "them", text: "I'd love to perform at your event! My rate for a 45-minute set is $800. Shall we proceed?" },
    ],
  },
  {
    id: 2,
    name: "Carlos Rivera",
    role: "Comedian",
    time: "1h ago",
    preview: "Let me check my availability.",
    unread: false,
    messages: [
      { id: 1, from: "me",   text: "Hi Carlos! We'd love to have you perform at our company event." },
      { id: 2, from: "them", text: "Let me check my availability." },
    ],
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    role: "Dancer",
    time: "3h ago",
    preview: "Thank you for reaching out!",
    unread: false,
    messages: [
      { id: 1, from: "them", text: "Thank you for reaching out! I'd be happy to discuss further." },
    ],
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const location = useLocation();

  // If navigated from a talent profile, pre-select that conversation (or default to first)
  const passedTalentName = location.state?.talentName;
  const defaultConvo = CONVERSATIONS.find((c) => c.name === passedTalentName) || CONVERSATIONS[0];

  const [activeConvo, setActiveConvo] = useState(defaultConvo);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(activeConvo.messages);

  const handleSelectConvo = (convo) => {
    setActiveConvo(convo);
    setMessages(convo.messages);
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "me", text: newMessage.trim() }]);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

        {/* ── LEFT: Conversation list ── */}
        <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((convo) => (
              <button
                key={convo.id}
                onClick={() => handleSelectConvo(convo)}
                className={`w-full text-left px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  activeConvo.id === convo.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">{convo.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{convo.time}</span>
                    {convo.unread && <div className="w-2 h-2 rounded-full bg-teal-600" />}
                  </div>
                </div>
                <p className="text-xs text-gray-400 truncate">{convo.preview}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Chat window ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-900">{activeConvo.name}</p>
              <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full mt-0.5">
                {activeConvo.role}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                </svg>
                Send Offer
              </button>
              <button
                onClick={() => navigate("/payment", { state: { talentName: activeConvo.name } })}
                className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                  <path d="M2 10h20" />
                </svg>
                Accept Offer
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-teal-700 text-white rounded-tr-sm"
                      : "bg-gray-100 text-gray-800 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="flex-shrink-0 w-9 h-9 bg-teal-700 hover:bg-teal-800 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

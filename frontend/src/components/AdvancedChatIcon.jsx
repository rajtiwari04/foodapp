import React from "react";

export default function AdvancedChatIcon({ size = 56, unreadCount = 0, isTyping = false, onClick }) {
  const px = `${size}px`;
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      style={{ width: px, height: px, borderRadius: 16 }}
      className="bg-white shadow-lg inline-flex items-center justify-center"
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {unreadCount > 0 && (
        <span style={{ position: "absolute", top: -6, right: -6, background: "red", color: "white", borderRadius: 10, padding: "2px 6px", fontSize: 12 }}>
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}

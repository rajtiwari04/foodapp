import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your FoodApp assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...messages, { from: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          from: "bot",
          text: data?.reply || "Sorry, I couldn't understand that.",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { from: "bot", text: "Error contacting the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };
if (!open) {
  return (
    <button
      className="chat-toggle-btn"
      onClick={() => setOpen(true)}
      aria-label="Open Chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        width="28"
        height="28"
      >
        <path d="M12 3C6.477 3 2 6.94 2 11.5c0 1.96.804 3.78 2.17 5.225-.17 1.385-.716 2.969-1.9 4.684-.19.27-.14.64.11.85.21.18.52.212.77.077 2.82-1.53 4.805-3.087 5.98-4.108A11.948 11.948 0 0012 20c5.523 0 10-3.94 10-8.5S17.523 3 12 3z" />
      </svg>
    </button>
  );
}


  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <span>FoodApp Assistant</span>
        <button className="chatbox-close" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>

      <div className="chatbox-messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`chat-message ${
              m.from === "user" ? "chat-message-user" : "chat-message-bot"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="chat-typing">Assistant is typing…</div>}
      </div>

      <form className="chatbox-input-row" onSubmit={handleSend}>
        <input
          className="chatbox-input"
          type="text"
          placeholder="Ask about menu, reservations, timings..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chatbox-send" type="submit" disabled={loading}>
          ➤
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("receiveMessage", (data) => {
      console.log("Chat response:", data);
      console.log("data : ", data.outputs[0].outputs[0].artifacts.message);
      const newMessage = {
        text: data.outputs[0].outputs[0].artifacts.message,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setLoading(false);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      const newMessage = {
        text: "An error occurred.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setLoading(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (!socket || !inputValue.trim()) return;

    // Add user message to chat
    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const messageData = {
        inputValue: inputValue,
      };

      socket.emit("sendMessage", messageData);
      setInputValue("");
    } catch (error) {
      console.error("Error:", error.message);
      const errorMessage = {
        text: "An error occurred.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-lvw bg-[#121212] flex flex-col h-screen ">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
        <div className="flex flex-col space-y-3 max-w-5xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[100%] sm:max-w-[100%] md:max-w-[100%] px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                  message.isUser
                    ? "bg-[#358078] text-white rounded-br-none"
                    : "bg-[#0f172a] text-gray-100 rounded-bl-none"
                }`}
              >
                <div className="text-sm sm:text-base whitespace-pre-wrap break-words">
                  {message.text}
                </div>
                <div className="text-xs opacity-50 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="bg-[#121212] border-t border-slate-300 p-2 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-4 max-w-5xl mx-auto">
          <textarea
            className="flex-1 bg-[#0f172a] text-white rounded-lg p-2 sm:p-3 min-h-[44px] max-h-32 text-sm sm:text-base resize-none outline-none"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            className="bg-[#454149] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
            onClick={handleSubmit}
            disabled={loading || !inputValue.trim()}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

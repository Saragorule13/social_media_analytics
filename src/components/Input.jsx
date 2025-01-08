import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./styles/input.css";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("receiveMessage", (data) => {
      console.log("Chat response:", data);
      setResponse(data.outputs[0].outputs[0].outputs.message.text);
      setLoading(false);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      setResponse("An error occurred.");
      setLoading(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (!socket) return;
    
    setLoading(true);
    try {
      const messageData = {
        inputValue: inputValue
      };

      socket.emit("sendMessage", messageData);
    } catch (error) {
      console.error("Error:", error.message);
      setResponse("An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121212] h-[15vh] flex flex-col items-center justify-center">
      <div className="search-box flex items-center gap-4 p-3 rounded-lg border w-[70%]">
        <input
          className="border-none outline-none text-white bg-transparent flex-1"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {response && <div className="mt-4 text-white">{response}</div>}
    </div>
  );
};

export default Input;

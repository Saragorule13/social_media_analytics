import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL;
const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a "sendMessage" event from the client
  socket.on("sendMessage", async (data) => {
    try {
      const payload = {
        input_value: data.message, // Message from the client
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "ChatInput-4wzY1": {},
          "AstraDBToolComponent-gN1Sm": {},
          "ParseData-K6KIc": {},
          "Prompt-2H5ro": {},
          "ChatOutput-baAia": {},
          "GoogleGenerativeAIModel-aUBSi": {},
        },
      };

      const response = await axios.post(LANGFLOW_API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APPLICATION_TOKEN}`,
        },
      });

      // Emit the LangFlow API response back to the client
      socket.emit("receiveMessage", response.data);
    } catch (error) {
      console.error("Error calling LangFlow API:", error);
      socket.emit("error", {
        message: "Failed to get a response from LangFlow API.",
        details: error.message,
      });
    }
  });

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

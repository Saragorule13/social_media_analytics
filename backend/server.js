import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { LangflowClient } from "./src/services/langflowClient.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// LangflowClient configuration
const BASE_URL = "https://api.langflow.astra.datastax.com";
const APPLICATION_TOKEN = "AstraCS:rQnnpwOhKGghZkuGGveaKghC:52825a51402a617c0e75723481cadec193ba6ff16f512d1cb9e9402e2a887afc";
const langflowClient = new LangflowClient(BASE_URL, APPLICATION_TOKEN);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle incoming chat messages
  socket.on("chat-message", async (data) => {
    console.log(data)
    const { inputValue } = data;
    try {
      const response = await langflowClient.runFlow(
        "f049726b-0563-4f65-967c-c13a84e2f8c8",
        "37c06c22-02c2-4d97-af46-1cba5d3b7b40",
        inputValue,
        "chat",
        "chat",
        {
          "ChatInput-4wzY1": {},
          "AstraDBToolComponent-gN1Sm": {},
          "ParseData-K6KIc": {},
          "Prompt-2H5ro": {},
          "ChatOutput-baAia": {},
          "GoogleGenerativeAIModel-aUBSi": {}
        },
        true,
        (data) => console.log("Received:", data.chunk),
        (message) => console.log("Stream Closed:", message),
        (error) => console.log("Stream Error:", error)
      );
      socket.emit("chat-response", response);
    } catch (error) {
      console.error("Error running flow:", error);
      socket.emit("chat-response", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config({ path: "./config.env" });

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3:latest";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/reservation", reservationRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

app.post("/api/chat", async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for a restaurant/food ordering website.",
          },
          { role: "user", content: message },
        ],
        stream: false, 
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Ollama error:", response.status, text);
      return res.status(500).json({
        success: false,
        message: "Failed to get response from AI",
      });
    }

    const data = await response.json();
    const reply = data?.message?.content || "Sorry, I couldn't answer that.";

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);
    next(error); 
  }
});

dbConnection();
app.use(errorMiddleware);

export default app;

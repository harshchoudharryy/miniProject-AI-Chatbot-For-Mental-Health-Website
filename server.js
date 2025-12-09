const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// INIT GEMINI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "Message missing" });
    }

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ reply: "❌ Server error occurred" });
  }
});

// Render port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Gemini Chat Server Running on port ${PORT}`)
);

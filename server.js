const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());                 // FIX CORS
app.use(express.json());         // Allow JSON input

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  // Dummy AI response (replace with real logic)
  const reply = "You said: " + userMessage;

  res.json({ reply });
});

// Render.com port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

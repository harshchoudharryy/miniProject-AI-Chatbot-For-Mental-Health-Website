// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI with API Key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check route (optional)
app.get('/', (req, res) => {
  res.send('✅ Gemini Chat Server is running');
});

// Chat route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: 'No message received' });
    }

    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro-latest' });
    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('🔥 Error in /api/chat:', error);
    res.status(500).json({ reply: 'Something went wrong on the server.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

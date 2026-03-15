// ═══════════════════════════════════════════
//  server.js — Om More Portfolio AI Chatbot
//  Backend for Claude API
// ═══════════════════════════════════════════

const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());

// ⚠️ Yahan apni Claude API key daalo
// https://console.anthropic.com → API Keys → Create Key
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY';

app.post('/chat', async (req, res) => {
  const { system, messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ reply: 'Invalid request.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',  // fast + cheap model
        max_tokens: 400,
        system: system,
        messages: messages
      })
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
      res.json({ reply: data.content[0].text });
    } else {
      res.json({ reply: 'Sorry, I could not get a response. Please try again!' });
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ reply: 'AI se connect nahi ho paya. Please try again!' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('✅ Om More Chatbot Server is running!');
});

app.listen(3000, () => {
  console.log('✅ Chatbot server chal raha hai: http://localhost:3000');
  console.log('📌 Ab portfolio open karo aur chatbot use karo!');
});
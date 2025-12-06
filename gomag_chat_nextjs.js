/*
  Proiect Next.js gata de pus pe Vercel pentru bot Gomag
  Structura proiectului:
  gomag-chat/
    pages/
      api/chat.js
      index.js
    package.json
    .gitignore
*/

// package.json
{
  "name": "gomag-chat",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "13.5.2",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "openai": "^4.10.0"
  }
}

// pages/api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY not set" });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userMessage = req.body.message || "Salut, bot!";

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    const answer = response.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Serverless function error:", error);
    res.status(500).json({ error: error.message });
  }
}

// pages/index.js (optional test front-end)
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gomag Chat Test</h1>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Mesaj pentru bot" />
      <button onClick={sendMessage}>Trimite</button>
      <p>Răspuns: {response}</p>
    </div>
  );
}

// .gitignore
node_modules
.next
.env.local
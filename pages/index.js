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

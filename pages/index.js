import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("Salut! Sunt robotul AI de la IncaltaminteLaModa.ro. Cum te pot ajuta astăzi?"); // mesaj modificat

  const sendMessage = async () => {
    if (!message.trim()) return;
    setResponse(prev => prev + `\n\nTu: ${message}`);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setResponse(prev => prev + `\n\nBot: ${data.answer}`);
    setMessage("");
  };

  return (
    <div style={{ padding: '2rem', fontFamily:'Arial,sans-serif' }}>
      <div style={{ border:'1px solid #ccc', borderRadius:'8px', padding:'1rem', height:'300px', overflowY:'auto', background:'#f9f9f9', whiteSpace:'pre-wrap' }}>
        {response}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
        placeholder="Scrie mesajul..." 
        style={{ width:'70%', padding:'0.5rem', borderRadius:'8px', border:'1px solid #ccc', marginTop:'0.5rem' }} 
      />
      <button onClick={sendMessage} style={{ padding:'0.5rem 1rem', borderRadius:'8px', border:'none', background:'#0070f3', color:'white', cursor:'pointer', marginLeft:'0.5rem' }}>
        Trimite
      </button>
    </div>
  );
}


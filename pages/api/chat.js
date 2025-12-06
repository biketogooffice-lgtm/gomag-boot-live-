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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, topicName } = req.body || {};

  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Please type a question." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is not set. Add it in your Vercel project's Environment Variables.",
    });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly, precise medical study tutor helping a student learning Anatomy, Physiology, and Medical Biochemistry. Give clear, accurate, exam-relevant answers. Keep answers focused and not overly long.",
          },
          {
            role: "user",
            content: topicName
              ? `Regarding the topic "${topicName}": ${question}`
              : question,
          },
        ],
        max_tokens: 500,
        temperature: 0.4,
      }),
    });

    const data = await openaiResponse.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const answer = data.choices?.[0]?.message?.content || "No answer returned.";
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong contacting the AI tutor." });
  }
}

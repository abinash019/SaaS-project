exports.generateResponse = async (prompt) => {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      throw new Error(data?.error?.message || "Groq API failed");
    }

    const content = data?.choices?.[0]?.message?.content || null;

    if (!content) {
      console.log("⚠️ Unexpected Groq response:", data);
      throw new Error("Invalid AI response format");
    }

    return content;
  } catch (err) {
    console.log("🔥 FULL AI ERROR:", {
      message: err.message,
      response: err.response?.data,
      stack: err.stack,
    });

    return "AI is temporarily unavailable. Please try again.";
  }
};

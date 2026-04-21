"use client";

import { useState } from "react";
import { sendPrompt } from "@/services/ai.service";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    const res = await sendPrompt(message);

    console.log("🔥 STATUS:", res.status);
    console.log("🔥 DEEPSEEK DATA:", res.data);

    setReply(res.data.reply);
  };

  return (
    <div>
      <h1>Chat</h1>

      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>

      <p>{reply}</p>
    </div>
  );
}

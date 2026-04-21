import api from "../lib/axios";

export const sendPrompt = (prompt) => {
  return api.post("/ai/chat", { prompt });
};

import { GoogleVertexAIChatInput } from "langchain/chat_models/googlevertexai";

export const chatClientDefaultConfig: GoogleVertexAIChatInput = {
  temperature: 0.2,
  topK: 3,
  maxOutputTokens: 1024,
};

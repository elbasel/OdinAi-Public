import { GoogleVertexAIChatInput } from "langchain/chat_models/googlevertexai";

export const chatClientConfig: GoogleVertexAIChatInput = {
  temperature: 0.2,
  maxOutputTokens: 200,
};

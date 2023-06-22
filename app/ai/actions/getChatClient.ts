"use server";

import {
  ChatGoogleVertexAI,
  GoogleVertexAIChatInput,
} from "langchain/chat_models/googlevertexai";
import path from "path";

export const getChatClient = async (config: GoogleVertexAIChatInput) => {
  if (!config) throw new Error("No config provided");
  // Authorize gcloud for api calls
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
    process.cwd(),
    "google-secrets.json"
  );

  return new ChatGoogleVertexAI(config);
};

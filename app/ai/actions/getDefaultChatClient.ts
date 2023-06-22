"use server";

import { ChatGoogleVertexAI } from "langchain/chat_models/googlevertexai";
import path from "path";
import { chatClientDefaultConfig } from "../config";

export const getDefaultChatClient = async () => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
    process.cwd(),
    "google-secrets.json"
  );

  return new ChatGoogleVertexAI(chatClientDefaultConfig);
};

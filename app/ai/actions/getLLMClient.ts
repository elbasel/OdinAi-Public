"use server";

import { GoogleVertexAIBaseLLMInput } from "langchain/dist/types/googlevertexai-types";
import { GoogleVertexAI } from "langchain/llms/googlevertexai";

import path from "path";

export const getLLMClient = async (config: GoogleVertexAIBaseLLMInput) => {
  if (!config) throw new Error("No config provided");
  // Authorize gcloud for api calls
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
    process.cwd(),
    "google-secrets.json"
  );

  return new GoogleVertexAI(config);
};

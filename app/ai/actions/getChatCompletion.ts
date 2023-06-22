import { type BaseChatMessage } from "langchain/dist/schema";
import { getLangChainMessage } from "../util";
import { getChatClient } from "./getChatClient";

export const getChatCompletion = async (
  prompt: string,
  maxTokens = 1024
): Promise<string> => {
  const userMessage = getLangChainMessage({
    id: "1",
    author: "human",
    text: prompt,
    createdAt: new Date().toISOString(),
  });
  const langchainMessages: BaseChatMessage[] = [userMessage];
  // const chatClient = await getDefaultChatClient();
  const chatClient = await getChatClient({
    temperature: 0.2,
    topK: 3,
    maxOutputTokens: maxTokens,
  });
  const newLangChainMessage: BaseChatMessage = await chatClient.call(
    langchainMessages
  );

  return newLangChainMessage.text;
};

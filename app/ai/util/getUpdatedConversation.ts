import { type GoogleVertexAIChatInput } from "langchain/chat_models/googlevertexai";
import "server-only";
import { getChatClient } from "../actions/getChatClient";
import {
  AIChatMessage,
  BaseChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";

type Args = {
  sysMsg?: string;
  conversation: string[];
  config?: GoogleVertexAIChatInput;
};

export const getUpdatedConversation = async ({
  sysMsg,
  conversation,
  config,
}: Args) => {
  const chatClient = await getChatClient(
    config ?? {
      temperature: 0.2,
      maxOutputTokens: 1024,
      topK: 3,
    }
  );

  const langchainMessages: BaseChatMessage[] = [];

  conversation.forEach((msg, i) => {
    if (i % 2 !== 0) langchainMessages.push(new HumanChatMessage(msg));
    if (i % 2 === 0) langchainMessages.push(new AIChatMessage(msg));
  });

  const aiResponse = await chatClient.call([
    new SystemChatMessage(sysMsg ?? ""),
    ...langchainMessages,
  ]);

  const newConversation: string[] = [...conversation, aiResponse.text];
  console.log("newConversation", newConversation);

  if (
    aiResponse.text.toLocaleLowerCase().includes("sorry") ||
    aiResponse.text.toLocaleLowerCase().includes("not able to help")
  ) {
    newConversation.pop();
    newConversation.pop();
    newConversation.push("******");
    newConversation.push(aiResponse.text);
  }

  return newConversation;
};

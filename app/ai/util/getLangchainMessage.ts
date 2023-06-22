import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import { type AppMessage } from "../lib";

export const getLangChainMessage = (
  message: AppMessage
): HumanChatMessage | AIChatMessage | SystemChatMessage => {
  const { author, text } = message;

  switch (author) {
    case "human":
      return new HumanChatMessage(text);
    case "ai":
      return new AIChatMessage(text);
    case "system":
      return new SystemChatMessage(text);
  }
};

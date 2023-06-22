import { kv } from "@vercel/kv";

export const getUserConversation = async (userId: string) => {
  const currentConversation = await kv.get<string[]>(`conversationOf${userId}`);
  return currentConversation;
};

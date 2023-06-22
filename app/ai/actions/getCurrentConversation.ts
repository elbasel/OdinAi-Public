"use server";

import { kv } from "@vercel/kv";
import { databaseKeys } from "../database";

export const getCurrentConversation = async (): Promise<string[]> => {
  const currentConversation = await kv.get<string[]>(
    databaseKeys.conversationStringList
  );
  return currentConversation ?? [];
};

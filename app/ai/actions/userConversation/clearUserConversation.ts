"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export const clearUserConversation = async ({ userId = "" }) => {
  if (!userId) throw new Error("userId is required");
  await kv.set<string[]>(`conversationOf${userId}`, []);
  revalidatePath(`/ai/ask`);
};

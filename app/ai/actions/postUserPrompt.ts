"use server";

import { revalidatePath } from "next/cache";
import { kv } from "@vercel/kv";
import { paths } from "@app/config";
import { databaseKeys } from "../database";
import { getUpdatedConversation } from "../util/getUpdatedConversation";

export const postUserPrompt = async (userPrompt: string, userId: string) => {
  // await kv.set(databaseKeys.conversationStringList, [])
  // return

  let currentUserConversation: string[] | null = await kv.get<string[]>(
    `anonConversation-${userId}`
  );

  const currentGlobalConversation =
    (await kv.get<string[]>(databaseKeys.conversationStringList)) ?? [];

  if (!currentUserConversation) currentUserConversation = [];

  if (!userPrompt) return;
  currentUserConversation.push(userPrompt);

  const newConversation = await getUpdatedConversation({
    sysMsg:
      "You are a chatbot in a big chat room with many users, be friendly, talkative and funny.",
    conversation: currentUserConversation,
  });

  await kv.set<string[]>(`anonConversation-${userId}`, newConversation);
  await kv.set<string[]>(databaseKeys.conversationStringList, [
    ...currentGlobalConversation,
    ...newConversation.slice(-2),
  ]);
  revalidatePath(paths.ai);

  return;
};

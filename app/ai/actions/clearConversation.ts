import { kv } from "@vercel/kv";
import { paths } from "@app/config";
import { revalidatePath } from "next/cache";
import { databaseKeys } from "../database";

export const clearConversation = async () => {
  await kv.set<string[]>(databaseKeys.conversationStringList, []);
  revalidatePath(paths.ai);
};

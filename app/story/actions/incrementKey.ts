"use server";

import { kv } from "@vercel/kv";
import { getVotes } from "./getVotes";
import { revalidatePath } from "next/cache";

interface Args {
  key: string;
}

export const incrementKey = async ({ key }: Args) => {
  const currentVotes: number = await getVotes({ choiceKey: key });
  kv.set(key, currentVotes + 1);
  revalidatePath("/story");
};

"use server";

import { kv } from "@vercel/kv";
import { getVotes } from "./getVotes";
import { revalidatePath } from "next/cache";

interface Args {
  key: string;
}

export const decrementKey = async ({ key }: Args) => {
  let currentVotes: number = await getVotes({ choiceKey: key });
  // * ensure non-negative value for votes
  if (currentVotes < 1) currentVotes = 1;
  kv.set(key, currentVotes - 1);
  revalidatePath("/story");
};

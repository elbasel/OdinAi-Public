"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

interface Args {
  choiceKey: string;
}

export const getVotes = async (args: Args): Promise<number> => {
  if (!args?.choiceKey) return 1;
  const votes = await kv.get<number>(args.choiceKey);
  revalidatePath("/story");
  return votes ?? 1;
};

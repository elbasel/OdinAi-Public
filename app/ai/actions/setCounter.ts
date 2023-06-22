"use server";

import { kv } from "@vercel/kv";
// import { revalidatePath } from "next/cache";

export const setCounter = async (newValue: number) => {
  await kv.set<number>("counter", newValue);
  // revalidatePath(paths);
};

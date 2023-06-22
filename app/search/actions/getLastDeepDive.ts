"use server";

import { kv } from "@vercel/kv";

export const getLastDeepDive = async (userId: string) => {
  const lastDeepDive = await kv.get<string>(userId + ":" + "lastDeepDive");
  return lastDeepDive;
};

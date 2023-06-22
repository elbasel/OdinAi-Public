"use server";

import { kv } from "@vercel/kv";

export const getSourceUrl = async (userId: string) => {
  return await kv.get<string>(userId + ":" + "sourceUrl");
};

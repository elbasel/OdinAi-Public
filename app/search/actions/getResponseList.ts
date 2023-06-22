"use server";

import { kv } from "@vercel/kv";

export const getResponseList = async (userId: string) => {
  return await kv.get<string[]>(userId + ":" + "responseList");
};

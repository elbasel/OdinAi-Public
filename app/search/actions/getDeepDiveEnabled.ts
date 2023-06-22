"use server";

import { kv } from "@vercel/kv";

export const getDeepDiveEnabled = async (userId: string) => {
  return await kv.get<boolean>(userId + ":" + "deepDiveEnabled");
};

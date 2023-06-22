"use server";

import { kv } from "@vercel/kv";

// await kv.set<string>(userId + ":" + "divDeeperURl", bestSearchResult);
export const getDiveDeeperURL = async (userId: string) => {
  return await kv.get<string>(userId + ":" + "diveDeeperURl");
};

"use server";

import { kv } from "@vercel/kv";

export const getPrevSearchTerm = async (userId: string) => {
  const searchTerm = await kv.get<string>(userId + ":" + "searchTerm");
  // if (!searchTerm) throw new Error("Invalid search term");
  return searchTerm;
};

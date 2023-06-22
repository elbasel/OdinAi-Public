"use server";

import { kv } from "@vercel/kv";

export const getCounter = async (): Promise<number> => {
  const currentCounter = await kv.get<number>("counter");
  return currentCounter ?? 0;
};

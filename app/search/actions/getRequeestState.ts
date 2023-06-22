"use server";

import { kv } from "@vercel/kv";

export const getRequestState = async () => {
  return kv.get<string>("requestState");
};

"use server";

import { kv } from "@vercel/kv";
import { AppNote } from "../lib";
import { revalidatePath } from "next/cache";

export const saveNote = async ({ id, title, content }: AppNote) => {
  kv.set<string>(id, JSON.stringify({ id, title, content }));
  revalidatePath(`/note/${id}`)
};

import { kv } from "@vercel/kv";
import { type AppNote } from "../lib";

export const getNoteById = async (noteId: string): Promise<AppNote> => {
  let noteUnparsed = await kv.get<string>(noteId);

  const note: AppNote = {
    id: "-1",
    title: "Note not found",
    content: "",
  };

  if (!noteUnparsed || noteUnparsed === "") return note;

  try {
    const { id, title, content }: AppNote = JSON.parse(noteUnparsed);
    if (!id || !title || !content) throw new Error("Invalid note");

    note.id = id;
    note.title = title;
    note.content = content;
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);
  }

  return note;
};

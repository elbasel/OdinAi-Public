import { getSampleNotes } from "./getSampleNotes";
import { type AppNote } from "../lib";

export const getAllNotes = async (): Promise<AppNote[]> => {
  return getSampleNotes();
};

import { type AppNote } from "../lib";

export const getSampleNotes = () => {
  return sampleNotes;
};

const sampleNotes: AppNote[] = [
  {
    id: `${Date.now()}`,
    title: "",
    content: "",
  },
];

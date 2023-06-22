// import { getAllNotes, getNoteById } from "@app/note/GET";
// import { type AppNote } from "@app/note/types";

import { SlideIn } from "@app/ui";
import { getNoteById } from "../actions";
import { Note } from "../ui";

// Don not cache fetch requests for this page, even though it's being rendered on the server still!
// This add { cache: 'no-store', next: { revalidate: 0 } to every fetch request on this page
export const dynamic = "force-dynamic";

// revalidate this page every 2 minutes, in case of using ISR
// export const revalidate = 120;

// !! Params properties are always strings
interface Props {
  params: {
    id: string;
  };
}

const NotePage = async ({ params: { id } }: Props) => {
  const { title, content } = await getNoteById(id);
  return (
    <SlideIn from="left">
      <Note id={id} title={title} content={content} />
    </SlideIn>
  );
};

export default NotePage;

// * generateStaticParams can be used here to generate static documents
// this function should return an array of `params` objects
// here, each `params` object is a note
// export const generateStaticParams = async () => {
//   const allNotes: AppNote[] = await getAllNotes();
//   return allNotes.map(({ id }) => ({ id }));
// };

// export const generateMetadata = async ({ params: { id } }: Props) => {
//   const allNotes: AppNote[] = await getAllNotes();
//   const note = allNotes.find((note) => note.id === id);

//   if (!note) return { title: "Not Found", description: "Note not found" };
//   const { title, content }: AppNote = note;

//   return {
//     title,
//     description: content,
//   };
// };

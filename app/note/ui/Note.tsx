import { twMerge } from "tailwind-merge";
import { articleStyles } from "@app/ui/styles";
import { AppNote } from "../lib";
import { noteStyles } from "./styles";
import { TextArea } from "@app/ui/TextArea";
import { Input } from "@app/ui/Input";

export const Note = ({ id, title, content }: AppNote) => {
  return (
    <div className="h-full mb-2">
      <article
        id={"Note: " + id}
        className={twMerge(articleStyles, noteStyles, "h-full")}
      >
        {/* <h2 className="py-2 text-xl font-bold text-blue-500">
          <Input keyString="userNoteTitle" placeholder="Title" defaultValue={title} />
        </h2> */}
        <TextArea value={content} />
      </article>
    </div>
  );
};

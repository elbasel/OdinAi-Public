import { type AppMessage } from "../lib";

export const Message = ({ id, text, author, createdAt }: AppMessage) => {
  return (
    <li id={`msg_${id}`}>
      <span>{author}</span>
      <p>{text}</p>
      <span>{createdAt}</span>
    </li>
  );
};

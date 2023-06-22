"use client";

import { useEffect, useState, useTransition } from "react";
import { incrementKey } from "../actions/incrementKey";
import { twMerge } from "tailwind-merge";
import { RiLoader3Fill } from "react-icons/ri";
import { UnChooseButton } from "./UnChooseButton";

interface Props {
  choiceKey: string;
  votes: number;
}

const buttonClassName =
  "w-full hover:bg-blue-700 delay-100 bg-black py-4 items-center justify-center capitalize font-bold flex gap-2 flex-1 px-4 w-full active:scale-95 transition-all duration-300";

export const ChooseButton = ({ choiceKey, votes }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [doneLoading, setDoneLoader] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votedFor, setVotedFor] = useState("");

  const handleChoiceClick = (formData: FormData) => {
    const storedVotedState = localStorage.getItem("voted");

    if (isPending || storedVotedState) return;
    localStorage.setItem("voted", "true");
    localStorage.setItem("votedFor", choiceKey);
    startTransition(() => {
      incrementKey({ key: choiceKey });
    });
  };

  useEffect(() => {
    setVoted(false);
    setVotedFor("");
    const storedVotedState = localStorage.getItem("voted");
    const storedVotedFor = localStorage.getItem("votedFor");
    if (storedVotedState) setVoted(true);
    if (storedVotedFor) setVotedFor(storedVotedFor);
    setDoneLoader(true);
  });

  return (
    <div className="flex-1 overflow-hidden rounded-lg">
      <form
        className={twMerge(
          "animate-in relative fade-in duration-1000 running transition-all flex items-center justify-center flex-1 w-full bg-blue-700 chooseForm",
          choiceKey === votedFor && "flex-2"
        )}
        action={handleChoiceClick}
      >
        <button
          className={twMerge(
            buttonClassName,
            "disabled:cursor-not-allowed relative h-16 pr-14",
            votedFor === choiceKey && "bg-blue-700"
          )}
          disabled={isPending || !doneLoading}
        >
          {!doneLoading && (
            <RiLoader3Fill size={32} className="duration-1000 animate-spin" />
          )}
          {doneLoading && voted && (
            <span className="absolute flex items-center justify-center flex-1 min-h-full transition-all duration-1000 animate-in fade-in ease hover:opacity-0">
              {votes} votes
            </span>
          )}
          {doneLoading && voted && (
            <span className="absolute flex items-center justify-center flex-1 w-full min-h-full px-2 transition-all duration-1000 opacity-0 animate-in fade-in hover:opacity-100 hover:bg-blue-700 hover:text-white">
              {choiceKey}
            </span>
          )}

          {doneLoading && !voted && choiceKey}
        </button>
        <UnChooseButton hidden={!doneLoading || votedFor !== choiceKey} />
      </form>
    </div>
  );
};

export default ChooseButton;

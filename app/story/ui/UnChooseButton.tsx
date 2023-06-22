"use client";

import { useEffect, useState, useTransition } from "react";
import { MdCancel } from "react-icons/md";
import { decrementKey } from "../actions/decrementKey";
import { twMerge } from "tailwind-merge";
import { RiLoader3Fill } from "react-icons/ri";

export const UnChooseButton = ({ hidden }: { hidden?: boolean }) => {
  const [votedFor, setVotedFor] = useState<null | string>(null);
  const [isPending, startTransition] = useTransition();

  const refereshVotedFor = () => {
    const storedVotedFor = localStorage.getItem("votedFor");
    setVotedFor(storedVotedFor);
  };

  const decrementChoice = () => {
    if (!votedFor) return;
    localStorage.setItem("voted", "");
    localStorage.setItem("votedFor", "");
    startTransition(() => {
      decrementKey({
        key: votedFor,
      });
    });
  };

  useEffect(() => {
    const storedVotedFor = localStorage.getItem("votedFor");
    setVotedFor(storedVotedFor);
    const choiceList = document.querySelector(".choiceList");
    choiceList?.addEventListener("focus-within", refereshVotedFor, {
      once: true,
    });
  });

  if (hidden) return null;

  return (
    <div
      className={twMerge(
        "absolute right-0 top-1/2 -translate-y-1/2 h-16 min-w-[58px] z-10 flex items-center justify-center flex-1 max-w-[20%] bg-transparent rounded-tr-lg rounded-br-lg hover:bg-red-700",
        isPending && "bg-red-700"
      )}
    >
      {isPending && <RiLoader3Fill size={32} className="animate-spin" />}
      {votedFor && <Button action={decrementChoice} />}
    </div>
  );
};

const Button = ({ action }: any) => (
  <button
    formAction={action && action}
    className={twMerge(
      "transition-all animate-in items-center justify-center fade-in duration-1000 ease flex-1 flex fill-mode-forwards"
    )}
  >
    <MdCancel size={32} />
  </button>
);

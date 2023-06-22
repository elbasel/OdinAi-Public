"use client";

import { useEffect, useRef, useState } from "react";
import { experimental_useOptimistic as useOptimistic } from "react";
import { twMerge } from "tailwind-merge";
import { BsFillSendFill } from "react-icons/bs";
import { RiLoader3Fill } from "react-icons/ri";
import { inputStyles } from "@app/ui/styles";
import { buttonStyles } from "@app/ui/styles/button";
import { postUserPrompt } from "../actions";

interface Props {
  currentConversation: string[];
}

type OptimisticState = {
  optimisticConversation: string[];
  isPending: boolean;
};

export const ChatForm = ({ currentConversation }: Props) => {
  const [userId, setUserId] = useState(
    "Anonymous#" + Math.floor(Math.random() * 10000)
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);

  const [
    { optimisticConversation, isPending },
    optimisticallyUpdateConversation,
  ] = useOptimistic(
    { optimisticConversation: currentConversation, isPending: false },
    (currentState: OptimisticState, updatedConversation: string[]) => {
      return { optimisticConversation: updatedConversation, isPending: true };
    }
  );

  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scroll({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [optimisticConversation]);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId != null) setUserId(savedUserId);
  }, []);
  return (
    <>
      <output
        ref={outputRef}
        className="flex-1 block pr-2 overflow-x-hidden overflow-y-auto rounded-lg mt-14 app-scrollbar"
      >
        {optimisticConversation?.map((message, i) => (
          <div
            key={Math.random() + message}
            className={twMerge(
              "flex flex-col fill-mode-forwards mb-2 px-2 py-2 duration-1000 border border-gray-400 rounded-lg fade-in",
              i % 2 === 0 && "bg-blue-500/20",
              i === optimisticConversation.length - 1 && "animate-in"
            )}
          >
            <pre className="flex flex-wrap max-w-full max-h-full break-all whitespace-pre-wrap">
              {message}
            </pre>
          </div>
        ))}
      </output>

      <div className="pr-1">
        <form
          className="flex w-full gap-2 border border-white rounded-lg"
          action={(formData: FormData) => {
            const userPrompt = formData.get("userPrompt")?.toString();

            if (!userPrompt || isPending) return;
            if (inputRef.current) inputRef.current.value = "";
            const p = `anon#${userId}: ${userPrompt}`;

            optimisticallyUpdateConversation([...optimisticConversation, p]);
            postUserPrompt(p, userId);
          }}
        >
          <input
            ref={inputRef}
            // autoFocus
            required
            className={inputStyles}
            type="text"
            placeholder={isPending ? "Thinking..." : "Type something..."}
            name="userPrompt"
          />
          <button disabled={isPending} className={buttonStyles} type="submit">
            {isPending && (
              <RiLoader3Fill size={18} className="duration-1000 animate-spin" />
            )}
            {!isPending && <BsFillSendFill size={18} />}
          </button>
        </form>
      </div>
    </>
  );
};

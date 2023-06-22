"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { requestContextualAiResponse } from "@app/ai/actions/userConversation/requestContextualAiResponse";
import { experimental_useOptimistic as useOptimistic } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { BsFillSendFill } from "react-icons/bs";
import { buttonStyles } from "@app/ui/styles/button";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { AiOutlinePlus } from "react-icons/ai";
import { clearUserConversation } from "@app/ai/actions/userConversation/clearUserConversation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type OptimisticState = {
  optimisticConversation: string[];
  isPending: boolean;
};

interface Props {
  userId: string;
  userName?: string;
  conversationList: string[];
}

// todo:make a universal form component that is more modular
export const PrivateChatForm = ({
  userId,
  conversationList,
  userName,
}: Props) => {
  const outputRef = useRef<HTMLOutputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [
    { optimisticConversation, isPending },
    optimisticallyUpdateConversation,
  ] = useOptimistic(
    { optimisticConversation: conversationList, isPending: false },
    (currentState: OptimisticState, updatedConversation: string[]) => {
      return { optimisticConversation: updatedConversation, isPending: true };
    }
  );

  // const [isPending, startTransition] = useTransition();
  const [isClearing, startClearing] = useTransition();
  const [userNotes, setUserNotes] = useState("");

  // get locally stored user notes
  useEffect(() => {
    const storedUserNotes = localStorage.getItem("userNotes");
    if (storedUserNotes == null) return;
    setUserNotes(storedUserNotes);
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    const output = document.querySelector("output");
    if (!output) return;
    output.scroll({
      top: output.scrollHeight,
      behavior: "smooth",
    });
    // }, 100);
  }, [optimisticConversation]);

  return (
    <>
      <output
        ref={outputRef}
        className="px-2 flex flex-col justify-end min-h-[75h] max-h-[75vh] text-inherit flex-1 overflow-y-auto app-scrollbar !scrollbar-thin"
      >
        {optimisticConversation.map((msg, i) => (
          <div
            key={msg + Math.random()}
            className={twMerge(
              "text-lg px-2 mb-4 border-b border-current ease duration-500 rounded-lg py-1",
              i % 2 !== 0 && "bg-sky-900/40",
              i === optimisticConversation.length - 1 && "animate-in fade-in"
            )}
          >
            <pre className="break-words whitespace-pre-wrap">{msg}</pre>
          </div>
        ))}
      </output>
      <div className="pr-1">
        <form
          className="flex gap-2 border border-current rounded-lg text-inherit"
          action={(formData: FormData) => {
            const userPrompt: string | undefined = formData
              .get("userPrompt")
              ?.toString();

            if (!userPrompt) return toast.error("Please enter a prompt!");
            if (userPrompt.length < 2) toast.error("Prompt is too short!");
            if (inputRef.current) inputRef.current.value = "";

            // if (userNotes == "")
            //   return toast.error(
            //     "Please add some notes before asking a question!"
            //   );

            const privateAiName = localStorage.getItem("privateAiName");

            optimisticallyUpdateConversation([
              ...optimisticConversation,
              userPrompt,
            ]);
            requestContextualAiResponse({
              userId,
              userName,
              userPrompt,
              context: userNotes,
              aiName: privateAiName,
            });
          }}
        >
          <input
            autoComplete="off"
            ref={inputRef}
            name="userPrompt"
            className="block w-full px-2 py-2 bg-transparent rounded-lg text-inherit focus:outline-none"
            placeholder={isPending ? "Thinking..." : "Ask me anything"}
            type="text"
          />
          <button disabled={isPending} className={buttonStyles} type="submit">
            {isPending && (
              <RiLoader3Fill size={20} className="duration-1000 animate-spin" />
            )}
            {!isPending && <BsFillSendFill size={20} />}
          </button>
          <button
            disabled={isClearing}
            formAction={() => {
              startClearing(() => {
                clearUserConversation({ userId });
              });
            }}
            className={twMerge(buttonStyles)}
          >
            {isClearing && (
              <RiLoader3Fill size={32} className="duration-1000 animate-spin" />
            )}
            {!isClearing && <AiOutlinePlus size={32} className="text-white" />}
          </button>
        </form>
      </div>
    </>
  );
};

{
  /* <div className="flex gap-2 px-8 py-2 pb-8 border-b border-gray-500 rounded-lg">

          <input
            ref={inputRef}
            name="userPrompt"
            className="flex-1 inline-block px-4 py-2 text-white bg-black border border-white rounded-lg"
            placeholder={isPending ? "Thinking..." : "Ask me anything"}
            type="text"
          />
          <button disabled={isPending} className={buttonStyles} type="submit">
            {isPending && (
              <RiLoader3Fill size={20} className="duration-1000 animate-spin" />
            )}
            {!isPending && <BsFillSendFill size={20} />}
          </button>
        </div> */
}

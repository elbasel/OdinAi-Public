"use client";

import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { sleep } from "@app/util";

interface Props {
  children?: ReactNode;
}
const enterAnimation = "animate-in slide-in-from-top-full fade-in";

const exitAnimation = "animate-out slide-out-to-top-full fade-out";

export const CornerMiniModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [animation, setAnimation] = useState(enterAnimation);

  useEffect(() => {
    // Wait 5 seconds before showing the modal
    sleep(5).then(() => {
      setOpen(true);
    });

    // Wait 16 seconds before shaking the modal
    sleep(16).then(() => {
      setAnimation("animate-shake repeat-[3] duration-1000 ease delay-1000");
    });

    // Wait 20 seconds before closing the modal
    sleep(20).then(() => {
      setAnimation(exitAnimation);
      // Wait for the animation to finish before removing dom element
      sleep(2).then(() => {
        setOpen(false);
      });
    });
  }, []);

  if (!open) return null;

  return (
    <div
      className={twMerge(
        "px-4 py-2 fixed top-0 right-0 text-white bg-black rounded-lg duration-500 fill-mode-forwards w-[60vw] text-center z-50",
        enterAnimation,
        animation
      )}
    >
      <span className="text-sm">{children}</span>
    </div>
  );
};

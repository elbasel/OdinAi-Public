"use client";

import { closeFullscreen, openFullscreen } from "@app/util/fullscreen";
import { useState } from "react";
import { BsFullscreen } from "react-icons/bs";

export const FullScreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onClick = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      closeFullscreen();

      return;
    }

    setIsFullscreen(true);
    openFullscreen();
  };

  return (
    <button aria-label="Toggle Fullscreen" onClick={onClick}>
      <BsFullscreen size={28}/>
    </button>
  );
};

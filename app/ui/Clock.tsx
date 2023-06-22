"use client";

import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour12: true,
          timeStyle: "short",
        })
      );
    }, 6000);
    return () => clearInterval(timer);
  });

  return <div className="pointer-events-none">{time}</div>;
};


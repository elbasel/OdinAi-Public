"use client";

import { useEffect, useState } from "react";

export const LocalUserId = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId == null || storedUserId == "")
      return setUserId(Math.random().toString(36).substring(7));

    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  return (
    <></>
    // <p className="px-2 py-2 mt-auto text-sm text-gray-400 bg-transparent">
    //   Your randomely generated id: {userId}
    // </p>
  );
};

export default LocalUserId;

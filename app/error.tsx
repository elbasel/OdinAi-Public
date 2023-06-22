"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { mainHeadingStyle } from "./ui/styles";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="px-4 py-2 rounded-lg bg-blue-950">
      <h1 className={mainHeadingStyle}>Too many requests at the same time, please try again later.</h1>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}

"use client";

import { useTransition } from "react";
import { setCounter } from "../actions/setCounter";

interface Props {
  counter: number;
}

export const IncrementButton = ({ counter }: Props) => {
  const [isPending, startTransition] = useTransition();

  const incrementCounter = () =>
    startTransition(async () => {
      setCounter(counter + 1);
    });

  return (
    <div>
      <p>Normal Counter: {counter}</p>
      <p>Is Pending: {isPending ? "Pending" : "Idle"}</p>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  );
};

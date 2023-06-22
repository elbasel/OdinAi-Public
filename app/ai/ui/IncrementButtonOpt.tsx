"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { setCounter } from "../actions/setCounter";

interface Props {
  counter: number;
}

type optimisticCounterState = { optimisticCounter: number; pending: boolean };

export const IncrementButtonOpt = ({ counter }: Props) => {
  const [{ optimisticCounter, pending }, optimisticallyUpdateCounter] =
    useOptimistic(
      { optimisticCounter: counter, pending: false },
      (currentState: optimisticCounterState, updatedCounter: number) => {
        return { optimisticCounter: updatedCounter, pending: true };
      }
    );

  const addOneOptimistic = async () => {
    const updatedCounter = optimisticCounter + 1;
    optimisticallyUpdateCounter(updatedCounter);
    await setCounter(counter + 1);
  };

  return (
    <div>
      <p> Optimistic Counter: {optimisticCounter}</p>
      <p> status: {pending ? "Pending" : "Idle"}</p>
      <button onClick={addOneOptimistic}>Add One Optimistic</button>
    </div>
  );
};

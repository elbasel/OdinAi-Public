"use client"
import { Input } from "@app/ui/Input";

interface Props {}

export const PrivateAiNameInput = ({}: Props) => {
  return (
      <Input
        defaultValue="Jarvis"
        keyString="privateAiName"
        placeholder="Give your AI a name"
        className="w-1/2 border border-white/60 hover:border-blue-600"
      />
  );
};


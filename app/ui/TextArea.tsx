"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
}

export const TextArea = ({ value }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // save inputted user notes locally
  const onBlur = () => {
    const textareaHtmlElement = textareaRef.current;
    if (!textareaHtmlElement) return;
    const { value } = textareaHtmlElement;
    localStorage.setItem("userNotes", value);
  };

  // load locally stored user notes
  useEffect(() => {
    const storedText = localStorage.getItem("userNotes");
    if (!storedText || storedText == null) return;
    const textareaHtmlElement = textareaRef.current;
    if (!textareaHtmlElement) return;
    textareaHtmlElement.value = storedText;
  }, []);

  return (
    <textarea
      placeholder="Tap here..."
      ref={textareaRef}
      // rows={10}
      onBlur={onBlur}
      className="w-full min-h-full px-4 pt-6 text-lg duration-500 bg-transparent border-0 rounded-lg resize-none focus:text-white text-inherit app-scrollbar md:text-xl animate-in fade-in linear noteContent focus:outline-none focus:ring-4 ring-blue-600 focus:bg-black"
      defaultValue={value}
    />
  );
};

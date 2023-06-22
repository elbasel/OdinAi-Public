"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  name?: string;
  defaultValue: string;
  placeholder?: string;
  keyString: string;
  saveToLocalStorage?: boolean;
  className?: string;
  onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({
  defaultValue,
  placeholder,
  keyString,
  saveToLocalStorage,
  onchange: onChange,
  className,
  name,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    const currentText = inputRef.current?.value;
    // if (!currentText || currentText == null || !saveToLocalStorage) {
    //   return;
    // }
    localStorage.setItem(keyString, currentText || defaultValue);
  };

  useEffect(() => {
    const storedText = localStorage.getItem(keyString);

    if (!storedText || storedText == null) {
      localStorage.setItem(keyString, defaultValue);
      return;
    }

    const inputHtmlElement = inputRef.current;
    if (!inputHtmlElement) return;
    inputHtmlElement.value = storedText;
  }, []);

  return (
    <input
      onChange={onChange}
      name={name}
      ref={inputRef}
      onBlur={onBlur}
      placeholder={placeholder}
      className={twMerge(
        "w-full px-4 py-2 text-xl transition-all duration-500 bg-transparent border-0 rounded-lg md:text-3xl focus:outline-none focus:bg-black focus:text-white animate-in fade-in ease",
        className
      )}
      defaultValue={defaultValue}
    />
  );
};

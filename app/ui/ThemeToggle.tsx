"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Loader } from "./Loader";

const themes: Theme[] = [
  {
    className: "bg-black text-white",
    textColor: "white",
    backgroundColor: "black",
    index: 0,
  },
  {
    className: "bg-slate-900 text-white",
    textColor: "white",
    backgroundColor: "rgb(15, 23, 42)",
    index: 1,
  },
  {
    className: "bg-white text-black",
    textColor: "black",
    backgroundColor: "white",
    index: 2,
  },
  {
    className: "bg-black text-gray-400",
    textColor: "white",
    backgroundColor: "black",
    index: 3
  }
];

type Theme = {
  className: string;
  index: number;
  textColor: string;
  backgroundColor: string;
};

export const ThemeToggle = () => {
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<Theme | undefined>();

  const onClick = () => {
    const currentThemeIndex = currentTheme?.index ?? 0;
    let nextThemeIndex = currentThemeIndex + 1;
    if (nextThemeIndex >= themes.length) nextThemeIndex = 0;

    const nextTheme = themes[nextThemeIndex];

    setCurrentTheme(nextTheme);
  };

  useEffect(() => {
    if (!currentTheme) return;
    const htmlElement = document.querySelector("html") as HTMLElement;
    htmlElement.className = currentTheme?.className ?? "";
    htmlElement.style.setProperty("--text-color", currentTheme.textColor);
    htmlElement.style.setProperty("--bg-color", currentTheme.backgroundColor);
    localStorage.setItem("currentTheme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  useEffect(() => {
    const currentThemeUnParsed = localStorage.getItem("currentTheme");

    try {
      if (!currentThemeUnParsed) return setLoading(false);
      const parsedTheme = JSON.parse(currentThemeUnParsed);
      setCurrentTheme(parsedTheme);
    } catch (error) {}

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen bg-black">
        <Loader />
      </div>
    );
  return (
    <button
      onClick={onClick}
      style={{ borderColor: currentTheme?.textColor }}
      className={twMerge(
        "h-8 w-8 rounded-full border",
        currentTheme?.className
      )}
    >
      <span hidden>Toggle Theme</span>
    </button>
  );
};

export default ThemeToggle;

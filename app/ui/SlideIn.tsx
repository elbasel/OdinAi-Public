import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  from: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const SlideIn = ({ children, from, className }: Props) => {
  const directionClass = `slide-in-from-${from}`;
  return (
    <div
      className={twMerge(
        "duration-1000 animate-in fade-in app-scrollbar overflow-y-auto flex-1 max-h-full",
        directionClass,
        className
      )}
    >
      {children}
    </div>
  );
};

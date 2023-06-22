"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { navItemStyles } from "./styles";

interface Props {
  children: ReactNode;
  href: string;
  altHref?: string;
}

export const NavItem = ({ children, href, altHref }: Props) => {
  const pathname: string = usePathname();
  const isActive = pathname === href || pathname === altHref;

  return (
    <li
      className={twMerge(
        navItemStyles,
        isActive && "animate-in duration-100fade-in text-blue-500"
      )}
    >
      {children}
    </li>
  );
};

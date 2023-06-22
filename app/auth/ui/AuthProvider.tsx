"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

// enables children to use the "useSession" hook
// ? why not just use SessionProvider directly instead of wrapping it in AuthProvider?
// !! Some react components still make use of client-side nextjs features like "useContext"
// !! however, they do not specify that they are a client component by using the "useClient" directive, which will result in an error
export const AuthProvider = ({ children }: Props) => {
  return <SessionProvider basePath="/auth">{children}</SessionProvider>;
};

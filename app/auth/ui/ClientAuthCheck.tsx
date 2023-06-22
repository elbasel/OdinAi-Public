"use client";

import { useSession } from "next-auth/react";
import { Loader } from "@app/ui";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ClientAuthCheck = ({ children, fallback }: Props) => {
  const { data, status } = useSession();

  if (status === "loading") return <>{fallback}</> || <Loader />;
  if (status === "unauthenticated") return null;
  return <>{children}</>;
};

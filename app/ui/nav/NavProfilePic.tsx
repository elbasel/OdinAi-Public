/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { circleStyles } from "../skeleton/styles";

export const NavProfilePic = () => {
  const { data, status } = useSession();

  if (status === "loading") return <span className={circleStyles} />;

  if (status === "unauthenticated") return <CgProfile size={32} />;
  const src = data?.user?.image || "";

  return (
      <img
        className="inline-block duration-300 ease-in rounded-full animate-in fade-in"
        src={src}
        alt="profile picture"
        width={32}
        height={32}
      />
  );
};

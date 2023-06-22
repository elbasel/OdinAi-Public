"use server";

import { getServerSession } from "next-auth";
import { type AppUser } from "../lib";

export const getUser = async (): Promise<AppUser | undefined> => {
  const session = await getServerSession();
  const nextAuthUserObj = session?.user;

  if (!nextAuthUserObj) return;
  const userName = nextAuthUserObj?.name;
  const userEmail = nextAuthUserObj?.email;
  const userImage = nextAuthUserObj?.image;
  // treat null and undefined the same way to simplify the logic
  // null is when the user didn't provide the info
  // undefined is when the auth provider does not support the info
  const appUser: AppUser = {
    name: userName ? userName : undefined,
    email: userEmail ? userEmail : undefined,
    image: userImage ? userImage : undefined,
  };

  return appUser;
};


import { randomUUID } from "crypto";
import { AppUser } from "../lib";

// !! getServerSession needs to be called within the context of a compnent or a route file
// for example a server action that is being used inside a form component;
// the below code will triggers errors because the `getUserId` function is called
// by `getUserConversation`, while `getUserConversation` is called within the Conversation component
// the 'getUserId` is being called from inside `getUserConversation' which is a regular function
// whichi is why we are not allowed to get the currentUser using `getCurrentUser` in the below function
// import { getCurrentUser } from "./getCurrentUser";

type Args = {
  appUser: AppUser;
};
export const getUserId = async ({ appUser }: Args) => {
  const { name, email } = appUser;

  const validUserId = `${name}:${email?.slice(0, 6)}`;
  return validUserId;
};

import Link from "next/link";
import { PrivateChatForm } from "./ui/PrivateChatForm";
import { getUserId } from "@app/auth/actions/getUserId";
import { getUserConversation } from "../actions/userConversation/getUserConversation";
import { getUser } from "@app/auth/actions";
import { type AppUser } from "@app/auth/lib";
// import { PrivateAiNameInput } from "./ui/PrivateAiNameInput";
import { mainHeadingStyle } from "@app/ui/styles";

const AskAiPage = async () => {
  const user: AppUser | undefined = await getUser();

  if (!user) return <RequestSignIn />;
  if (!user.name) throw new Error("Encountered user object with no name!");
  const appUser: AppUser = {
    name: user.name,
    email: user?.email ?? "",
    image: user?.image ?? "",
  };
  const userId = await getUserId({
    appUser,
  });

  if (!userId) throw new Error("Invalid userID");
  const userConversation: string[] | null = await getUserConversation(userId);

  return (
    <>
      <div className="flex items-center gap-4">
        {/* <h1 className={mainHeadingStyle}>Private Chat</h1> */}
        {/* <PrivateAiNameInput /> */}
      </div>
      <div className="mt-auto">
        <PrivateChatForm
          conversationList={userConversation ?? []}
          userId={userId}
          userName={appUser.name}
        />
      </div>
    </>
  );
};

export default AskAiPage;

const RequestSignIn = () => (
  <div className="flex items-center h-full text-4xl font-bold">
    <span className="px-[20vw] leading-relaxed">
      You need to{" "}
      <Link
        className="text-blue-700 transition-all duration-300 hover:text-blue-600 hover:underline decoration-wavy underline-offset-45 decoration-orange-600"
        href="/auth/signin"
      >
        sign in
      </Link>{" "}
      to use this feature
    </span>
  </div>
);

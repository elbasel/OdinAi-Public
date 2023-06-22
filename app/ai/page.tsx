import { mainHeadingStyle } from "@app/ui/styles";
import { getCurrentConversation } from "./actions";
import { ChatForm } from "./ui";
import { buttonStyles } from "@app/ui/styles/button";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { getUser } from "@app/auth/actions";
import { redirect } from "next/navigation";

const AiPage = async () => {
  const currentConversation = await getCurrentConversation();
  const user = await getUser();
  if (user) return redirect("/ai/ask");

  return (
    <>
      {/* <h1 className={mainHeadingStyle}>Chat</h1> */}
      <div className="fixed top-0 z-20 flex items-center w-full gap-2 pb-4 my-2 bg-black/20">
        <Link className="px-2 py-[2px] bg-blue-600 rounded-lg" href="/auth/signin">
          Sign in
        </Link>
        <span>to access private chat</span>
      </div>
      <ChatForm currentConversation={currentConversation} />
    </>
  );
};

export default AiPage;

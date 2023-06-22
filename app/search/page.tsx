import { getResponseList } from "./actions/getResponseList";
import { SearchForm } from "./ui/SearchForm";
import { GoLinkExternal } from "react-icons/go";
import Link from "next/link";
import { getUser } from "@app/auth/actions";
import { getUserId } from "@app/auth/actions/getUserId";
import { getDiveDeeperURL } from "./actions/getDiveDeeperURL";
import { getDeepDiveEnabled } from "./actions/getDeepDiveEnabled";
// import ReactMarkdown from "react-markdown";

const SearchPage = async () => {
  const user = await getUser();

  if (!user) return <RequestSignIn />;

  const userId = await getUserId({
    appUser: user,
  });

  if (!userId) throw new Error("Invalid user id");

  const responseList = await getResponseList(userId);
  // await kv.set<string>(userId + ":" + "divDeeperURl", bestSearchResult);
  const diveDeeperUrl = await getDiveDeeperURL(userId);
  // const deepDiveEnabled = await getDeepDiveEnabled(userId);

  return (
    <>
      <output className="flex max-h-[80vh] flex-col gap-2 overflow-y-auto flex-1 pt-8 duration-500 animate-in slide-in-from-bottom app-scrollbar">
        {responseList?.map((r, i) => {
          if (i !== 0) return null;
          return (
            <pre
              key={r + Math.random().toFixed(4)}
              className="px-4 mx-auto mt-auto text-lg break-words whitespace-pre-wrap duration-500 animate-in fade-in slide-in-from-bottom app-scrollbar md:text-xl"
            >
              {r}
            </pre>
          );
        })}
      </output>
      <span className="flex items-center gap-2 py-4 mt-auto overflow-hidden text-ellipsis whitespace-nowrap">
        <GoLinkExternal className="block w-6 h-6 text-white" size={23} />
        <a
          target="_blank"
          href={diveDeeperUrl ?? "#"}
          className="inline-block text-sm md:text-base max-w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <span className="text-blue-400">
            {diveDeeperUrl?.replace("https://", "")}
          </span>
        </a>
      </span>
      <div className="pr-1">
        <SearchForm
          userId={userId}
          deepDiveUrl={diveDeeperUrl ?? ""}
          // deepDiveEnabled={deepDiveEnabled ?? false}
        />
      </div>
    </>
  );
};

export default SearchPage;

const RequestSignIn = () => (
  <div className="flex items-center h-full text-4xl font-bold">
    <span className="leading-relaxed">
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

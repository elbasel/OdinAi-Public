import { getAllNotes } from "@app/note/actions";
import { getUser } from "@app/auth/actions";
import { Note } from "@app/note/ui";
import { mainHeadingStyle } from "@app/ui/styles";

import { type AppUser } from "./auth/lib";

// * disable any form of server side requests caching made from this page, even those made by an orm like sequelize, also true for prisma calls:
// export const dynamic = "force-dynamic";
// * Revalidate page every n seconds, this is the recommended approach IF using generateStaticParams
// export const revalidate = 60;
// disable client side caching
// export const fetchCache = "force-no-store";

const HomePage = async () => {
  const allNotes = await getAllNotes();
  const user: AppUser | undefined = await getUser();
  return (
    <>
      <h1 className={mainHeadingStyle}>
        Welcome {user?.name && "Back! "}
        <span className="inline-block text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text">
          {user?.name}
        </span>
      </h1>
      {!user && (
        <p className="px-2 my-2 text-sm text-gray-400">
          Everything you type below you can ask your private AI about later,
          from time to time the AI might add some notes on of its own based on
          the info you provide.
        </p>
      )}
      <section className="h-[74%] px-2 my-2">
        {allNotes.map(({ id, title, content }) => (
          <Note key={id} id={id} title={title} content={content} />
        ))}
      </section>
      {!user && (
        <footer className="px-2 mt-auto">
          <p className="text-sm text-gray-400">
            <span className="text-yellow-500" aria-label="warning">
              ⚠️
            </span>
            Your notes are only stored locally on your device, clearing site
            data will delete all of your notes!
          </p>
        </footer>
      )}
    </>
  );
};

export default HomePage;

import { getVotes } from "./actions/getVotes";
import ChooseButton from "./ui/ChooseButton";

export const metadata = {
  title: "Story",
  description:
    "Play a text based adventure game where the community decides the outcome and the story",
};

const StoryPage = async () => {
  const firstChoice = "Go left";
  const secondChoice = "Go right";
  const context =
    "You are faced with a crossroads, you have two options, where do you go?";

  const firstChoiceVotes: number = await getVotes({ choiceKey: firstChoice });
  const secondChoiceVotes: number = await getVotes({ choiceKey: secondChoice });

  return (
    <>
      <h1 className="pt-20 font-bold bg-black/70 fixed h-[80vh] pointer-events-none px-4 w-screen inset-0 text-5xl lg:text-7xl">
        {context}
      </h1>
      <div
        style={{
          backgroundImage:
            "url(https://thoughtcatalog.com/wp-content/uploads/2014/06/shutterstock_182120438.jpg)",
        }}
        className="bg-no-repeat bg-auto fixed inset-0 h-[80vh] w-screen z-[-2] rounded-lg overflow-hidden pointer-events-none bg-center"
      ></div>
      <ul className="flex gap-4 py-4 mt-auto text-xl md:text-3xl choiceList">
        <li className="flex w-1/2">
          <ChooseButton choiceKey={firstChoice} votes={firstChoiceVotes} />
        </li>
        <li className="flex w-1/2">
          <ChooseButton choiceKey={secondChoice} votes={secondChoiceVotes} />
        </li>
      </ul>
    </>
  );
};

export default StoryPage;

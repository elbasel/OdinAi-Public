import { getCounter } from "@app/ai/actions";
import { IncrementButton, IncrementButtonOpt } from "@app/ai/ui";
import {mainHeadingStyle} from "@app/ui/styles";


const UseTransitionPage = async () => {
  const counter = await getCounter();

  return (
    <div className="flex flex-col h-full px-4 py-2">
      <h1 className={mainHeadingStyle}>Unnamed</h1>
      <IncrementButtonOpt counter={counter} />
      <hr className="block my-2 border border-white" />
      <IncrementButton counter={counter} />
    </div>
  );
};

export default UseTransitionPage;

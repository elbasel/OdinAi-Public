import { BsCircleHalf } from "react-icons/bs";

export const Loader = () => {
  return (
    <div className="fixed flex items-center justify-center w-screen h-screen pointer-events-none">
      <BsCircleHalf size={200} className="animate-spin" />
    </div>
  );
};

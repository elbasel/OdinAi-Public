/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { mainHeadingStyle } from "@app/ui/styles";
import { getUser } from "@app/auth/actions";
import { type AppUser } from "@app/auth/lib";

const ProfilePage = async () => {
  const user: AppUser | undefined = await getUser();

  if (!user) return redirect("/auth/signin");

  const { email, name, image } = user;

  return (
    <>
      <img
        width={120}
        height={120}
        className="rounded-full"
        src={image}
        alt="Profile Image"
      />
      <h1 className={mainHeadingStyle}>{name}</h1>
      <Link href="/auth/signout">
        <FiLogOut
          className="text-red-600 transition-all active:scale-95"
          size={28}
        />
      </Link>
    </>
  );
};

export default ProfilePage;

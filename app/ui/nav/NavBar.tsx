import Link from "next/link";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { BsChatFill } from "react-icons/bs";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { paths } from "@app/config";
import { navListStyles, navLinkStyles, navBarStyles } from "./styles";
import { NavItem, NavProfilePic } from ".";
import { FullScreenButton } from "../buttons";
import ThemeToggle from "../ThemeToggle";

export const NavBar = () => {
  return (
    <nav className={navBarStyles}>
      <ul className={navListStyles}>
        <NavItem href="/">
          <Link aria-label="Go to homepage" className={navLinkStyles} href="/">
            <AiFillHome size={32} />
          </Link>
        </NavItem>
        <NavItem href={paths.ai} altHref="/ai/ask">
          <Link
            aria-label="Talk with Ai"
            href={paths.ai}
            className={navLinkStyles}
          >
            <BsChatFill
              style={{
                color: "var(--text-color)",
              }}
              size={32}
            />
          </Link>
        </NavItem>
        {/* <NavItem href="/test">
          <Link aria-label="test" href="/test" className={navLinkStyles}>
            <BiTestTube size={32} />
          </Link>
        </NavItem> */}
        {/* <NavItem href="/story">
          <Link aria-label="story" href="/story" className={navLinkStyles}>
            <FaGamepad size={32} />
          </Link>
        </NavItem> */}
        {/* <NavItem href="/ai/ask">
          <Link aria-label="ask" href="/ai/ask" className={navLinkStyles}>
            <AiFillStar
              className="animate-pulse repeat-[20] duration-1000"
              size={32}
            />
          </Link>
        </NavItem> */}
        <NavItem href="/search">
          <Link aria-label="search" href="/search" className={navLinkStyles}>
            <BsGlobeAmericas size={32} />
          </Link>
        </NavItem>

        <NavItem href={paths.you}>
          <Link
            aria-label="Go to your profile page"
            href="/you"
            className={navLinkStyles}
          >
            <NavProfilePic /> {/* Client Component */}
          </Link>
        </NavItem>
        <NavItem href="">
          <FullScreenButton />
        </NavItem>
        <NavItem href="">
          <ThemeToggle />
        </NavItem>
      </ul>
    </nav>
  );
};

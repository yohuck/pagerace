import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { faBook, faBookBookmark, faMagnifyingGlass, faHouse, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Navbar = () => {
    const { data: sessionData } = useSession();

    return (
        <nav className="flex w-full md:w-fit md:gap-3 md:border-none md:justify-start border-t-2 md:bg-inherit bg-slate-100 border-black md:flex-col justify-center items-center gap-1 py-5 fixed md:top-0 bottom-0">
        <Link className="" href={'/'}>
        <FontAwesomeIcon icon={faHouse} size="xl" className="mx-3 boxshadow aspect-square p-3 border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" />
        </Link>
        <Link className="" href={'/booksearch'}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" className=" mx-3 aspect-square boxshadow p-3 border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" />
        </Link>
        <Link className="" href={'/shelf'}>
        <FontAwesomeIcon icon={faBookBookmark} size="xl" className=" mx-3 boxshadow aspect-square p-3 border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" />
        </Link>
        <button className="" onClick={sessionData ? () => signOut() : () => signIn()}>
        <FontAwesomeIcon icon={faUserAlt} size="xl" className=" mx-3 boxshadow p-3 aspect-square border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" />
        </button>
        <div className="flex gap-2">
   
            {/* <button
        className="mx-5 rounded-md border-black border-2 p-1 boxshadow font-extrabold no-underline transition bg-white hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button> */}
        </div>
        </nav>
    );
    }

    export default Navbar;
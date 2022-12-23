import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { faFlagCheckered, faBookBookmark, faMagnifyingGlass, faHouse, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Navbar = () => {
    const { data: sessionData } = useSession();

    return (
        <nav className="flex md:mx-3 z-50 w-full md:w-fit md:gap-3 md:border-none md:justify-start border-t-2 md:bg-inherit bg-slate-100 border-black md:flex-col justify-center items-center gap-1 py-5 fixed md:top-0 bottom-0 ">
        <Link className="mx-3 flex flex-col justify-center items-center text-center boxshadow aspect-square border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1] w-full" href={'/'}>
        <FontAwesomeIcon icon={faHouse} size="xl" className="" />
        <p className="font-semibold">Home</p>
        </Link>
        <Link className="mx-3 flex flex-col justify-center items-center text-center boxshadow aspect-square border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1] w-full" href={'/booksearch'}>
        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" className="" />
        <p className="font-semibold">Search</p>
        </Link>
        <Link className="mx-3 flex flex-col justify-center items-center text-center boxshadow aspect-square border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1] w-full" href={'/shelf'}>
        <FontAwesomeIcon icon={faBookBookmark} size="xl" className="" />
        <p className="font-semibold">Shelf</p>
        </Link>
        <Link className="mx-3 flex flex-col justify-center items-center text-center boxshadow aspect-square border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1] w-full" href={'/servers'}>
        <FontAwesomeIcon icon={faFlagCheckered} size="xl" className="" />
        <p className="font-semibold">Race</p>
        </Link>
        
      

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
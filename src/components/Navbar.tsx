import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Navbar = () => {
    const { data: sessionData } = useSession();

    return (
        <nav className="flex justify-between m-3">
        <Link className="" href={'/'}>
        <FontAwesomeIcon icon={faBook} size="xl" className="boxshadow p-2 border-2 rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" />
        </Link>
        <div className="flex gap-2">
   
            <button
        className="bg-white rounded-md border-black border-2 p-1 boxshadow font-extrabold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
        </div>
        </nav>
    );
    }

    export default Navbar;
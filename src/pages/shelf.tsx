import Shelf from "../components/Shelf";
import { signIn, signOut, useSession } from "next-auth/react";


export default function YourShelfPage() {
    const { data: sessionData } = useSession();
    return (

        sessionData &&
        <div className='flex flex-col  min-h-screen'>
            <Shelf/>
        </div> || <div>No session data</div>
    );
    }
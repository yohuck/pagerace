import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export default function Shelf() {
    const { data: sessionData } = useSession();

    const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');

    return (

        <div className='flex flex-col  min-h-screen'>
          {yourShelf?.map(book => (
            <h2 key={book.id}>{book.title}</h2>
          ))}
        </div>
    );
    }
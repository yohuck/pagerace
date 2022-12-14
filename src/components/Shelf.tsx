import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Book from "./Book";
import Navbar from "./NewNav";

import { useState, useEffect } from "react";

export default function Shelf() {
    const { data: sessionData } = useSession();
  
    const { data: yourShelf } = trpc.example.getUserBooks.useQuery(sessionData?.user?.id || 'nouser');

    const [pagesRead, setPagesRead] = useState(0)
    const [visible, setVisible] = useState(0)
 
    
  useEffect(() => {

    let all = 0
    yourShelf?.forEach(book => {
     book.read ? all += Number(book.pages) : ''
              })
    all = all - visible
    setPagesRead(all)

    
  }, [yourShelf, visible])


    return (
      <>
      <Navbar pagesRead={pagesRead} />
      
        <div className="flex flex-col justify-center items-center pt-20  bg-gradient-to-b from-neutral-200 to-slate-200 min-h-screen">
    
            <h1 className="font-extrabold text-5xl m-5">Your Shelf</h1>
            <div className='text-white flex justify-center mx-auto flex-wrap gap-4 max-w-[1200px] min-h-full'  >
              {yourShelf?.map(book => (
                <Book key={book.id} book={book} setCount={setPagesRead}  count={pagesRead} />
              ))}
            </div>
            {
             } <p className="font-extrabold text-xl m-5">{pagesRead} pages read</p>
       
      </div>
      </>
    );
    }
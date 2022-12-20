import { useSession } from "next-auth/react";
import React from "react";

export type dbBook = {
    title: string,
    author: string,
    read: boolean,
    pages: string
}


const Book = ({ book }: {book: dbBook}) => {
    const onClick = (e: React.UIEvent<'button', UIEvent>) => {
        console.log(e.target)
    }
  // const getAll = trpc.example.getUsers.useQuery();
  const { data: sessionData} = useSession()
  console.log(sessionData)



  


    return (

        <li
       
        className={`  flex text-black flex-col border-black w-[30%] boxshadow bg-white justify-between rounded-md hover:ring-4  ring-[#f7e329] p-6 min-w-[350px] ${
          "border-4"
        }`}
      >
 
        <div className="info">
          <p tabIndex={book.title.length > 45 ? 0 : 1} className={`font-bold text-2xl ${book.title.length > 45 && 'dfn'}`} data-title={book.title}>{book.title.length > 45 ? book.title.slice(0,45) + '...' : book.title }</p>
          <p className="font-bold mb-5 h-[100px] overflow-y-auto">Author(s):
          <br></br>
         {book.author}
          </p>
        </div>
        <div className="flex justify-between">
          <p className=" font-bold p-2 border-2 rounded-lg w-fit text-center hover:opacity-75 text-white border-black bg-[#140c0d]">{book.pages} pages</p>
         <button onClick={onClick}>{book.read ? "Completed" : "Complete"}</button>
        </div> 
      </li>
       
    );
    }

    export default Book;
import type { book } from "./BookSearch";
import { useState } from "react";
import { useSession } from "next-auth/react";




const BookRow = ({ book, index }: {book: book, index: number}) => {
  const [ shelf, setShelf ] = useState<string>("Add to Shelf")
  // const getAll = trpc.example.getUsers.useQuery();
  const { data: sessionData} = useSession()



  const addToShelf = async (book: book, userId = 'clbv2cfr700009fvsvz5s2v7s' ) => {
    console.log(book)
    console.log(userId)
    setShelf("Added to Shelf");
    const a = await fetch("./api/addBooky", {
      method: "Post",
      body: JSON.stringify(
        {
          author: String(book.author_name),
          title: book.title,
          pages: String(book.number_of_pages_median),
          userId: userId
        }
      )
    })
    console.log(a)
  }


    return (

        <li
        data-isbn={book.isbn[0]}
        className={`  flex text-black flex-col border-black w-[30%] boxshadow bg-white justify-between rounded-md hover:ring-4  ring-[#f7e329] p-6 min-w-[350px] ${
          index % 2 ? "border-4 " : "border-4"
        }`}
        key={book.key}
      >
 
        <div className="info">
          <p tabIndex={book.title.length > 45 ? 0 : 1} className={`font-bold text-2xl ${book.title.length > 45 && 'dfn'}`} data-title={book.title}>{book.title.length > 45 ? book.title.slice(0,45) + '...' : book.title }</p>
          <p className="mb-5">{book.first_publish_year}</p>
          {book.subtitle && <p className="font-bold mb-5">{book.subtitle}</p>}
          
          <p className="font-bold mb-5 h-[100px] overflow-y-auto">Author(s):
          <br></br>
          {book.author_name?.map((author, index) => (
            <span key={index} className="font-normal">
               {` ${author}`}
              {index < book.author_name.length - 1 ? ", " : " "}
            </span>
          ))}
          </p>
        </div>
        <div className="flex justify-between">
          <p className=" font-bold p-2 border-2 rounded-lg w-fit text-center hover:opacity-75 text-white border-black bg-[#140c0d]">{book.number_of_pages_median} pages</p>
          <button onClick={
            () => shelf === 'Add to Shelf' ? addToShelf(book, sessionData?.user?.id) : setShelf("Add to Shelf")
            } className=" text-white hover:ring-[#f7e329] hover:ring font-bold p-2 border-2 rounded-lg w-fit text-center hover:opacity-75 border-black bg-[#140d0e]">{shelf}</button>
        </div> 
      </li>
       
    );
    }

    export default BookRow;
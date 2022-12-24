import { useSession } from "next-auth/react";
import React, {useState} from "react";
import { trpc } from "../utils/trpc";
import { useRouter   } from "next/router"
import { faRemove, faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type dbBook = {
    title: string,
    author: string,
    read: boolean,
    pages: string,
    id: string,
}



const Book = ({ book, setCount, count}: {book: dbBook, count: number, setCount: (value: number) => void }) => {
  const [isVis, setIsVis] = useState(true)
  const [read, setRead] = useState(book.read)
  // const router = useRouter()
  const deleteBook = trpc.example.deleteBook.useMutation()
  const startReadingBook = trpc.example.startBook.useMutation()
  const readBook = trpc.example.finishBook.useMutation()

    const removeFromShelf = async (e: React.MouseEvent) => {
      
        console.log(e.target)
        const id = book.id;
        console.log(id)

        deleteBook.mutate(id)
        setIsVis(false)
        // setVisible(visible + Number(book.pages))
      
      if (book.read || read){
        setCount((count) - Number(book.pages))
      }
       
        // router.reload()
    }

    const readBookShelf = async () => {
      if (!read){
        const id = book.id;
        readBook.mutate(id)
        setCount((count) + Number(book.pages))
        setRead(true)
      }




    }


    const startBook = async () => {
      if (!read){
        const id = book.id;
        startReadingBook.mutate(id)
      }
    }

  // const getAll = trpc.example.getUsers.useQuery();
  const { data: sessionData} = useSession()
  console.log(sessionData)



  


    return (
    

     isVis &&

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
        <div className="flex justify-start gap-2">
          <p className=" font-bold p-4 border-2 rounded-lg w-fit text-center hover:opacity-75 text-white border-black bg-[#140c0d]">{book.pages} pages</p>
          <button onClick={removeFromShelf}> <FontAwesomeIcon icon={faRemove} size="xl" className="aspect-square p-3 border-4 rounded-lg hover:opacity-75  border-[#e02339]" /></button>
         {/* <button onClick={ startBook }>{read ? <FontAwesomeIcon icon={faCheck} size="xl" className="aspect-square p-3 border-4 rounded-lg hover:opacity-75 border-black bg-[#23e046]" /> : <FontAwesomeIcon icon={faCircleCheck} color="#23e046" size="xl" className="aspect-square p-3 rounded-lg hover:opacity-75 border-4 border-[#23e046]" />} Start</button> */}
         <button onClick={ readBookShelf }>{read ? <FontAwesomeIcon icon={faCheck} size="xl" className="aspect-square p-3 border-4 rounded-lg hover:opacity-75 border-black bg-[#23e046]" /> : <FontAwesomeIcon icon={faCircleCheck} color="#23e046" size="xl" className="aspect-square p-3 rounded-lg hover:opacity-75 border-4 border-[#23e046]" />} Finish</button>
        </div> 
      </li> || <div></div>
      )
  }
    export default Book;
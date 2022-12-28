import { useSession } from "next-auth/react";
import React, {useState} from "react";
import { trpc } from "../utils/trpc";
import { faRemove, faCheck, faCircleCheck, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book } from "@prisma/client";



const Book = ({ book, setCount, count, }: {book: Book, count: number, setCount: (value: number) => void }) => {
  const [isVis, setIsVis] = useState(true)
  const [read, setRead] = useState(book.read)
 
  const deleteBook = trpc.example.deleteBook.useMutation()
  const startReadingBook = trpc.example.startBook.useMutation()
  const readBook = trpc.example.finishBook.useMutation()
  const [reRender, setReRender] = useState(true)

  const [dateFinished, setDateFinished] = useState(book.finishedAt)


    const removeFromShelf = async () => {
      const conf = confirm(`Are you sure you want to remove ${book.title} from your shelf?`)
      if (conf){
        const id = book.id;
        deleteBook.mutate(id)
        setIsVis(false)
      
      if (book.read || read ){
        setCount( count - book.pages)
      }}

      window.location.reload()
    }

    const readBookShelf = async () => {
      if (!read){
        const id = book.id;
        readBook.mutate(id)
        setCount((count) + Number(book.pages))
        setRead(true)
        setDateFinished(new Date())
      }
    }


    const startBook = async () => {
      if (!read){
        const id = book.id;
        startReadingBook.mutate(id)
        setReRender(!reRender)
      }
    }

    console.log(book.startedAt)


    return (
     isVis  &&
        <li
        className={`flex justify-between h-fit text-black flex-col border-black w-[30%]  bg-white rounded-md hover:ring-4  ring-[#f7e329] p-4 min-w-[350px] ${
          "border-4"
        }`}
      >

        

        <div className="flex flex-col">
     
          <p tabIndex={book.title.length > 45 ? 0 : 1} className={`font-bold text-2xl h-[80px] ${book.title.length > 45 && 'dfn'}`} data-title={book.title}>{book.title.length > 45 ? book.title.slice(0,45) + '...' : book.title }</p>

          <p className="font-bold h-[100px] overflow-y-auto">Author(s):
          <br></br>
         {book.author}
          </p>
     
        </div>
   
        <div className="flex flex-col justify-between gap-2 mb-4">
         
        
       
       { book.startedAt || ! reRender ? '' :
        <button onClick={ startBook } className="flex items-center justify-center gap-2 bg-green-50 border-2 border-black rounded-md boxshadow p-2 font-bold"><FontAwesomeIcon icon={faBookOpen} color="#23e046" size="xl" className="" /> Start</button>

       }
        {
         book.startedAt || !reRender  ?
         <button onClick={ readBookShelf } className="flex border-2 items-center justify-center gap-2 border-black bg-green-50 rounded-md boxshadow p-2 font-bold">{read ? <FontAwesomeIcon icon={faCircleCheck} color="#23e046"  size="xl" className="" /> : <FontAwesomeIcon icon={faCircleCheck}  size="xl" className="" />} {read ? `${dateFinished?.toDateString()}` : "Finish"}</button> : ''
       }
       <button onClick={removeFromShelf} className="flex items-center justify-center gap-2 bg-red-50 rounded-md boxshadow border border-black p-2 font-bold"> <FontAwesomeIcon icon={faRemove} size="xl" className="text-red-500" />Remove</button>
       </div> 


        <div className="font-bold  text-center p-2 bg-green-50"><p>{book.pages} pages</p></div>

      </li> || <div></div>
      )
  }
    export default Book;
import type { book } from "./BookSearch"

const BookRow = ({ book, index }: {book: book, index: number}) => {
  console.log(book)
    return (

        <li
        data-isbn={book.isbn[0]}
        className={`my-2  w-[95%] max-w-[900px] rounded-md border-[#EAC435] border-2 p-10 ${
          index % 2 ? "bg-[#0101010c]" : "bg-[#1a14142f]"
        }`}
        key={book.key}
      >
        <p className="font-bold text-2xl">{book.title}</p>
        <p className="mb-5">{book.first_publish_year}</p>
        {book.subtitle && <p className="font-bold mb-5">{book.subtitle}</p>}
        
       
        <p className="font-bold mb-5">Author(s): 
        <br></br>
        {book.author_name?.map((author, index) => (
          <span key={index} className="font-normal">
             {` ${author}`} 
      
            {index < book.author_name.length - 1 ? ", " : " "}
          </span>
        ))}
        </p>
        <p className="font-bold p-4 border-2 text-center  bg-[#990D35] border-[#EAC435] hover:bg-[#D52941]">{book.number_of_pages_median} pages</p>
      </li>
       
    );
    }

    export default BookRow;
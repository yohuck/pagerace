import Link from "next/link";
import React, { useState, useEffect } from "react";
import  BookRow  from "./BookRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";

interface returnedBooks {
  numFound: number;
  docs?: book[];
}

export interface book {
  key: string;
  title: string;
  author_name: string[];
  isbn: string;
  number_of_pages_median: number;
  subtitle?: string;
  first_publish_year: number;
  [key: string]: unknown;
}

const BookSearch = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [books, setBooks] = useState<returnedBooks>({ numFound: 0 });
  const [ isLoading, setIsLoading] = useState(false)
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (title.split("").length > 2) {
      try {
        const fetchBooks = async () => {
          setIsLoading(true);
          const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
          const json = await response.json();
          setBooks(json)
          setIsLoading(false)
        }
        fetchBooks()
        // fetch(`http://openlibrary.org/search.json?title=${title}`)
        //   .then((res) => res.json())
        //   .then((data) => setBooks(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [title]);

  useEffect(() => {
    if (author.split("").length > 2) {
      console.log(author);
      fetch(`https://openlibrary.org/search.json?author=${author}`)
        .then((res) => res.json())
        .then((data) => setBooks(data));
    }
  }, [author]);

  // useEffect((
  //     () => {
  //         if (books)  {
  //             console.log(books);
  //         }
  //     }
  // ), [books]);

   return ( sessionData &&
    <div className="flex flex-col items-center bg-neutral-200 min-h-screen">
      <h1 className="text-center text-5xl md:text-8xl font-black tracking-tight">
        BookRace
      </h1>
 

      <h2 className="text-center text-2xl md:text-4xl font-black tracking-tight">Find a book </h2>
      <Link className="fixed left-5 boxshadow text-center  w-fit  m-2 px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" href="/"><FontAwesomeIcon icon={faBook} size="xl" className="mx-1" /></Link>
      <Link className="fixed left-5 boxshadow text-center  w-fit  m-2 mt-[4.5rem] px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" href="/"><FontAwesomeIcon icon={faBookmark} size="xl" className="mx-1" /></Link>
      <div className="my-4 flex flex-wrap justify-center gap-4 text-2xl font-bold items-center">
        <input
          type="text"
          placeholder="Title"
          className="boxshadow border-2 border-black p-4 rounded-md font-bold text-xl"
          onBlur={(e) => setTitle(e.target.value)}
        /> or 
        <input
          type="text"
          placeholder="Author"
          className="boxshadow border-2 border-black p-4 rounded-md font-bold text-xl"
          onBlur={(e) => setAuthor(e.target.value)}
        />
      </div>
  
          {isLoading && <p className="text-5xl text-center my-5 py-10  text-black flex-col border-black w-[30%] boxshadow bg-white justify-between rounded-md font-extrabold boxshadow"><p className="my-10">Loading results</p><FontAwesomeIcon icon={faSpinner} spin size="2xl" className="mx-1" /></p>}
          <ul className=" text-white flex justify-center mx-auto flex-wrap gap-4 max-w-[1200px]">
            {books.numFound > 0 ? (
              books.docs?.filter(book => book.number_of_pages_median > 50 && book.isbn?.length > 0).map((book, index) => (
                <BookRow key={index} book={book} index={index} />
              ))
            ) : (
              <li className="m-4 border border-black bg-slate-900 p-3">
                No results, try a new search
                
              </li>
              
            )}
            
          </ul>

        
           
      </div>
  )  ||      <div className="flex flex-col items-center">
    <h1 className="text-center text-5xl md:text-8xl font-black tracking-tight">Please sign in</h1>
     <button
    className="boxshadow text-center  w-fit  m-2 px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]"
    onClick={ () => signIn()}
    >
    {"Sign in"}
    </button>
  </div>
};
export default BookSearch;

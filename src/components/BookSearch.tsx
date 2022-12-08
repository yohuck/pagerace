import Link from "next/link";
import React, { useState, useEffect } from "react";
import  BookRow  from "./BookRow";

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

  useEffect(() => {
    if (title.split("").length > 2) {
      try {
        fetch(`http://openlibrary.org/search.json?title=${title}`)
          .then((res) => res.json())
          .then((data) => setBooks(data));
      } catch (error) {
        console.log(error);
      }
    }
  }, [title]);

  useEffect(() => {
    if (author.split("").length > 2) {
      console.log(author);
      fetch(`http://openlibrary.org/search.json?author=${author}`)
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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-5xl font-black tracking-tight">
        BookRace
      </h1>
      <Link className="boxshadow text-center  w-fit mx-auto m-2 px-4   font-bold p-2 border-2 text-xl  rounded-lg hover:opacity-75 border-black bg-[#f8f0f1]" href="/">HOME</Link>
      <div className="my-4 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Title"
          className="boxshadow border-2 border-black p-4 rounded-md font-bold text-xl"
          onBlur={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="boxshadow border-2 border-black p-4 rounded-md font-bold text-xl"
          onBlur={(e) => setAuthor(e.target.value)}
        />
      </div>
  
      
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
  );
};
export default BookSearch;

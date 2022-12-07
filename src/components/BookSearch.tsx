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
  first_publish_year?: number;
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
    <div className="grid items-center">
      <h1 className="text-center text-4xl font-black text-white">
        Book Search
      </h1>
      <Link className="text-center border w-fit mx-auto m-2 px-2 hover:opacity-70 rounded-md text-white" href="/">Home</Link>
      <div className="my-4 flex flex-wrap justify-center gap-1">
        <input
          type="text"
          placeholder="Title"
          className="border-2 border-black p-1"
          onBlur={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border-2 border-black p-1"
          onBlur={(e) => setAuthor(e.target.value)}
        />
      </div>
      <ul className="m-2 text-white flex flex-wrap justify-center">
        {books.numFound > 0 ? (
          books.docs?.filter(book => book.number_of_pages_median > 0 && book.isbn?.length > 0).map((book, index) => (
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

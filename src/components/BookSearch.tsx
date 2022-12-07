import React, { useState, useEffect } from 'react';

const BookSearch = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (title) {
            fetch(`http://openlibrary.org/search.json?title=${title}`)
                .then((res) => res.json())
                .then((data) => setBooks(data));
        }
    }, [title]);

    useEffect(() => {
        if (author) {
            fetch(`http://openlibrary.org/search.json?author=${author}`)
                .then((res) => res.json())
                .then((data) => setBooks(data));
        }
    }
    , [author]);

    useEffect((
        () => {
            if (books)  {
                console.log(books);
            }
        }
    ), [books]);

    return (
        <div>
            <h1 className='text-4xl text-white font-black text-center'>Book Search</h1>
            <div className="my-4 flex gap-1 flex-wrap justify-center">
                <input
                    type="text"
                    placeholder="Title"
                    className='border-2 border-black p-1'
                    onBlur={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Author"
                    className='border-2 border-black p-1'
                    onBlur={(e) => setAuthor(e.target.value)}
                />
            </div>
            <ul className='text-white m-2'>
                {books.numFound > 0 ? 
                    books.docs.map((book, index) => (
                        <li className={`border p-3 my-2 border-black ${index % 2 ? 'bg-[#502987]' : 'bg-[#2b1854]'}` } key={book.key}>{book.title} - {book.number_of_pages_median} pages - {
                            book.author_name.map(
                                (author, index) => (
                     
                                    <span key={index}>{author}{index > 0 ? ' ' : ' '}</span>
                                )
                            )
                        }</li>
                    ))
                 : <li className='border p-3 border-black bg-slate-100 m-4'>No books</li>} 
            </ul>
        </div>
    );
}
export default BookSearch;


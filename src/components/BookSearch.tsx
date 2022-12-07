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
            <h1>Book Search</h1>
            <input
                type="text"
                placeholder="Title"
                onBlur={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                onBlur={(e) => setAuthor(e.target.value)}
            />
            <ul>
                {books.numFound > 0 ? 
                    books.docs.map((book) => (
                        <li key={book.key}>{book.title} - { book.subtitle} - {book.number_of_pages_median} pages - {
                            book.author_name.map(
                                (author, index) => (
                     
                                    <span key={index}>{author}{index > 0 ? ' ' : ' '}</span>
                                )
                            )
                        }</li>
                    ))
                 : <li>No books</li>} 
            </ul>
        </div>
    );
}
export default BookSearch;


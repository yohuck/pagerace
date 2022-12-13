import React, { useEffect, useState } from 'react';





const IndividualBookSearch =   ({isbn = '0201558025'}) => {
    const [book, setBook] = useState('');

    useEffect(() => {
        fetch(`https://openlibrary.org/search.json?isbn=${isbn}`)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
            .then(() => setBook('hello'))
    }, [isbn]);


// .then((data) => setBook(data));




    return (
        <div>
            <p>hello {book}</p>
        </div>
    )
}   

export {IndividualBookSearch};
import { useEffect, useState } from 'react';
import axios from 'axios';
import './booksList.css'

function BooksList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const apiUrl = 'https://612cd2cdab461c00178b5eed.mockapi.io/authors';
            const response = await axios.get(apiUrl);
            const authorsList = await response.data;

            const authorsMap = authorsList.reduce((acc, author) => {
                const id = author.id;
                acc[id] = `${author.firstName} ${author.lastName}`;
                return acc;
            }, {});

            const booksList = authorsList.map((author) => author.books).flat();

            booksList.map((book) => {
                book.authorName = authorsMap[book.authorId];
            });

            setBooks(booksList);
        }

        fetchData();
    }, []);

    const booksList = books.map((book) => {
        const style = {
            backgroundImage: `url(${book.bookCover})`
        };
        return (
            <div key={book.id} className='book-card'>
                <div style={style} className='book-image'></div>
                <div>
                    <p>Title: {book.name}</p>
                    <p>Author: {book.authorName}</p>
                </div>
            </div>
        )
    });

    return (
        <div className='books-wrapper'>
            {booksList}
        </div>
    );
}

export default BooksList;
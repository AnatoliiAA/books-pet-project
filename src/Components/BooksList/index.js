import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './booksList.css'

function BooksList() {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const { authorId } = useParams();

    useEffect(() => {
        async function fetchData() {
            const apiUrl = authorId
                ? `https://612cd2cdab461c00178b5eed.mockapi.io/authors/${authorId}`
                : 'https://612cd2cdab461c00178b5eed.mockapi.io/authors';
            const response = await axios.get(apiUrl);
            let authorsList = await response.data;

            if (!Array.isArray(authorsList)) {
                authorsList = [authorsList];
            }

            const authorsMap = authorsList.reduce((acc, author) => {
                const id = author.id;
                acc[id] = `${author.firstName} ${author.lastName}`;
                return acc;
            }, {});

            const booksList = authorsList.map((author) => author.books).flat();

            booksList.forEach((book) => {
                book.authorName = authorsMap[book.authorId];
            });

            setBooks(booksList);
            setAllBooks(booksList);
        }

        fetchData();
    }, [authorId]);

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        const regularExp = new RegExp(searchValue, 'i')
        const filteredBooks = allBooks.filter((book) => {
            const fullName = book.authorName;
            return regularExp.test(fullName);
        })
        setBooks(filteredBooks);
    }

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
            <input type='search' className='search-bar books-search-bar' placeholder='Search books by authors name' onInput={handleSearch} />
            {booksList}
        </div>
    );
}

export default BooksList;
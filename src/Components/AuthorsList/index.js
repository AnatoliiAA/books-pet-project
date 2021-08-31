import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { convertDate, debounce } from '../../helperFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './authorsList.css';

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = 'https://612cd2cdab461c00178b5eed.mockapi.io/authors';
      const response = await axios.get(apiUrl);
      const authorsList = await response.data;
      setAuthors(authorsList);
      setAllAuthors(authorsList);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    let result = window.confirm('Are you sure that you want to delete this author permanently?');
    if (result) {
      const filteredAuthors = authors.filter((author) => author.id !== id);
      setAuthors(filteredAuthors);
      setAllAuthors(filteredAuthors);
      const apiUrl = `https://612cd2cdab461c00178b5eed.mockapi.io/authors/${id}`;
      await axios.delete(apiUrl);
    }
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const regularExp = new RegExp(searchValue, 'i')
    const filteredAuthors = allAuthors.filter((author) => {
      const fullName = `${author.firstName} ${author.lastName}`;
      return regularExp.test(fullName);
    })
    setAuthors(filteredAuthors);
  }

  const tableBody = authors.map((author) => {
    return (
      <tr key={author.id}>
        <td>{convertDate(author.createdAt)}</td>
        <td>{author.firstName}</td>
        <td>{author.lastName}</td>
        <td>{convertDate(author.dateOfBirth)}</td>
        <td>{convertDate(author.dateOfDeath)}</td>
        <td>
          <Link to={{ pathname: `/books/${author.id}` }} className='author-button'><FontAwesomeIcon icon={faBook} /></Link>
          <button className='author-button'><FontAwesomeIcon icon={faUserEdit} /></button>
          <button className='author-button' onClick={() => handleDelete(author.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
        </td>
      </tr>
    )
  });

  return (
    <div className='authors-wrapper'>
      <input type='search' className='search-bar' placeholder='Search authors by name' onInput={handleSearch} />
      <button className='add-author'>Add author</button>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of birth</th>
            <th>Date of death</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </Table>
    </div>
  );
}

export default AuthorsList;

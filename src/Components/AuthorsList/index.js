import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { convertDate } from '../../helperFunctions/convertDate';

function AuthorsList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = 'https://612cd2cdab461c00178b5eed.mockapi.io/authors';
      const response = await axios.get(apiUrl);
      const authorsList = await response.data;
      setAuthors(authorsList);
    }
    fetchData();
  }, []);

  const tableBody = authors.map((author) => {
    return (
      <tr key={author.id}>
        <td>{convertDate(author.createdAt)}</td>
        <td>{author.firstName}</td>
        <td>{author.lastName}</td>
        <td>{convertDate(author.dateOfBirth)}</td>
        <td>{convertDate(author.dateOfDeath)}</td>
      </tr>
    )
  });

  return (
    <Table bordered hover size="sm">
      <thead>
        <tr>
          <th>Data</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of birth</th>
          <th>Date of death</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </Table>
  );
}

export default AuthorsList;

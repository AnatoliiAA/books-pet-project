import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getDateForInput } from '../../helperFunctions'

function ModalWindow(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');

  const handleBirthDateChange = (e) => {
    setDateOfBirth(e.target.value);
  }

  const handleDeathDateChange = (e) => {
    setDateOfDeath(e.target.value);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  }

  const handleAddAuthor = async () => {
    const apiUrl = 'https://612cd2cdab461c00178b5eed.mockapi.io/authors';
    const id = Number.parseInt(props.authors[props.authors.length - 1].id) + 1;
    const authorData = {
      'createdAt': new Date(),
      'id': id,
      'firstName': name,
      'lastName': lastname,
      'dateOfBirth': new Date(dateOfBirth),
      'dateOfDeath': new Date(dateOfDeath)
    };
    props.setAuthors([...props.authors, authorData]);
    props.handleClose();
    setDateOfBirth('');
    setDateOfDeath('');
    setName('');
    setLastname('');
    await axios.post(apiUrl, authorData);
  }

  const handleChangeAuthor = async () => {
    const apiUrl = `https://612cd2cdab461c00178b5eed.mockapi.io/authors/${props.data.id}`;
    const newDateOfBirth = dateOfBirth.length > 1 ? new Date(dateOfBirth) : new Date(props.data.dateOfBirth);
    const newDateOfDeath = dateOfDeath.length > 1 ? new Date(dateOfDeath) : new Date(props.data.dateOfDeath);

    const authorData = {
      'createdAt': props.data.createdAt,
      'id': props.data.id,
      'firstName': name || props.data.firstName,
      'lastName': lastname || props.data.lastName,
      'dateOfBirth': newDateOfBirth,
      'dateOfDeath': newDateOfDeath
    };
    const objIndex = props.authors.findIndex(author => author.id === props.data.id);
    props.authors[objIndex] = authorData;
    props.setAuthors(props.authors);
    props.handleClose();
    await axios.put(apiUrl, authorData);
    setDateOfBirth('');
    setDateOfDeath('');
    setName('');
    setLastname('');
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.type === 'add' ? 'Add new author' : 'Edit author'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" defaultValue={props.data.firstName || ''} onChange={handleNameChange} /> <br />
        <label htmlFor="lastname">Lastname: </label>
        <input type="text" id="lastname" defaultValue={props.data.lastName || ''} onChange={handleLastnameChange} /> <br />
        <label htmlFor="birth">Date of birth: </label>
        <input type="date" id="birth" defaultValue={getDateForInput(props.data.dateOfBirth) || '1990-01-01'} min="1600-01-01" max={getDateForInput()} onChange={handleBirthDateChange} /> <br />
        <label htmlFor="death">Date of death: </label>
        <input type="date" id="death" defaultValue={getDateForInput(props.data.dateOfDeath) || '2030-01-01'} min={dateOfBirth || '1600-01-01'} onChange={handleDeathDateChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.type === 'add' ? handleAddAuthor : handleChangeAuthor}>
          {props.type === 'add' ? 'Add new author' : 'Edit author'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalWindow;
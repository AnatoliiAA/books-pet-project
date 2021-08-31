import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {getDateForInput} from '../../helperFunctions'

function ModalWindow(props) {
  const [name, setName] = useState(props.data.firstName || '');
  const [lastname, setLastname] = useState(props.data.lastName ||'');
  const [dateOfBirth, setDateOfBirth] = useState(getDateForInput(props.data.dateOfBirth) || '1990-01-01');
  const [dateOfDeath, setDateOfDeath] = useState(getDateForInput(props.data.dateOfDeath) || '2030-01-01');

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
    await axios.post(apiUrl, authorData);
  }

  const handleChangeAuthor = async () => {
    const apiUrl = `https://612cd2cdab461c00178b5eed.mockapi.io/authors/${props.data.id}`;
    const authorData = {
      'createdAt': props.data.createdAt,
      'id': props.data.id,
      'firstName': name,
      'lastName': lastname,
      'dateOfBirth': new Date(dateOfBirth),
      'dateOfDeath': new Date(dateOfDeath)
    };
    const objIndex = props.authors.findIndex(author => author.id === props.data.id);
    props.authors[objIndex] = authorData;
    props.setAuthors(props.authors);
    props.handleClose();
    await axios.put(apiUrl, authorData);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.type === 'add' ? 'Add new author' : 'Edit author'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label for="name">Name: </label>
        <input type="text" id="name" defaultValue={name} onChange={handleNameChange} /> <br />
        <label for="lastname">Lastname: </label>
        <input type="text" id="lastname" defaultValue={lastname} onChange={handleLastnameChange} /> <br />
        <label for="birth">Date of birth: </label>
        <input type="date" id="birth" defaultValue={dateOfBirth} min="1600-01-01" max={getDateForInput()} onChange={handleBirthDateChange} /> <br />
        <label for="death">Date of death: </label>
        <input type="date" id="death" defaultValue={dateOfDeath} min={dateOfBirth || '1600-01-01'} onChange={handleDeathDateChange} />
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
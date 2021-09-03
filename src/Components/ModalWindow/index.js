import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getDateForInput, validateName } from '../../helperFunctions'

function ModalWindow(props) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [dateOfDeath, setDateOfDeath] = useState('2021-01-01');
  const [inputValid, setInputValid] = useState({
    'name': false,
    'lastname': false
  })

  useEffect(() => {
    if (props.type === 'edit') {
      setInputValid({
        'name': true,
        'lastname': true
      });
      setDateOfBirth(props.data.dateOfBirth);
      setDateOfDeath(props.data.dateOfDeath);
    }
    if (props.type === 'add') {
      setInputValid({
        'name': true,
        'lastname': true
      });
    }
  }, [props.data, props.type]);

  const handleBirthDateChange = (e) => {
    setDateOfBirth(e.target.value);
  }

  const handleDeathDateChange = (e) => {
    setDateOfDeath(e.target.value);
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value)) {
      setInputValid({
        ...inputValid,
        'name': true
      });
      setName(value);
    }
    if (!validateName(value)) {
      setInputValid({
        ...inputValid,
        'name': false
      });
      setName(value);
    }
  }

  const handleLastnameChange = (e) => {
    const value = e.target.value;
    if (validateName(value)) {
      setInputValid({
        ...inputValid,
        'lastname': true
      });
      setLastname(value);
    }
    if (!validateName(value)) {
      setInputValid({
        ...inputValid,
        'lastname': false
      });
      setLastname(value);
    }
  }

  const handleAddAuthor = async (e) => {
    e.preventDefault();
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
    const newAuthors = [...props.authors];

    newAuthors.push(authorData);
    props.setAuthors(newAuthors);
    await axios.post(apiUrl, authorData);
    setDateOfBirth('2000-01-01');
    setDateOfDeath('2021-01-01');
    setName('');
    setLastname('');
    props.handleClose();
  }

  const handleChangeAuthor = async (e) => {
    e.preventDefault();
    const apiUrl = `https://612cd2cdab461c00178b5eed.mockapi.io/authors/${props.data.id}`;
    const newDateOfBirth = new Date(dateOfBirth);
    const newDateOfDeath = new Date(dateOfDeath);
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
    setDateOfBirth('2000-01-01');
    setDateOfDeath('2021-01-01');
    setName('');
    setLastname('');
  }

  const handleCloseModal = () => {
    setDateOfBirth('2000-01-01');
    setDateOfDeath('2021-01-01');
    setName('');
    setLastname('');
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.type === 'add' ? 'Add new author' : 'Edit author'}</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.type === 'add' ? handleAddAuthor : handleChangeAuthor}>
        <Modal.Body>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" defaultValue={props.type === 'edit' ? props.data.firstName : ''} onChange={handleNameChange} required /> <br />
          <label htmlFor="lastname">Lastname: </label>
          <input type="text" id="lastname" defaultValue={props.type === 'edit' ? props.data.lastName : ''} onChange={handleLastnameChange} required /> <br />
          <label htmlFor="birth">Date of birth: </label>
          <input type="date" id="birth" defaultValue={props.type === 'edit' ? getDateForInput(props.data.dateOfBirth) : '2000-01-01'} min="1600-01-01" max={getDateForInput()} onChange={handleBirthDateChange} /> <br />
          <label htmlFor="death">Date of death: </label>
          <input type="date" id="death" defaultValue={props.type === 'edit' ? getDateForInput(props.data.dateOfDeath) : '2021-01-01'} min={getDateForInput(dateOfBirth)} max={getDateForInput()} onChange={handleDeathDateChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type='submit'>
            {props.type === 'add' ? 'Add new author' : 'Edit author'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ModalWindow;
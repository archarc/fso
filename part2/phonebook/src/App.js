import { useState, useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons'

const PersonDetail = (props) => {
  function removeContact(e) {
    if (window.confirm(`Delete ${props.name}?`)) {
      personServices
        .remove(props.id)
        .then(
          props.setContacts(props.contacts.filter(contact=>contact.name !== props.name))
        )
    }
  }

  return (
    <p>
      {props.name}  {props.number}  
    <button onClick={removeContact}>
      delete
    </button>
    </p>

  )
}

const SearchFilter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={props.change}/>
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.info}>
    <div>
      name: <input value={props.name} onChange={props.namechange}/>
    </div>
    <div>
      number: <input value={props.number} onChange={props.numberchange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const ConfirmNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='confirm'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Enter name')
  const [newNumber, setNewNumber] = useState('Enter number')
  const [newFilter, setNewFilter] = useState("")
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addInfo = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
    }

    for (const person of persons){
      if (person.name == nameObj.name) {
        if (window.confirm(`${nameObj.name} is already added to phonebook, replace old number with the new one?`)) {
          personServices
            .update(person.id, nameObj)
            .then(response=> {
              setPersons(persons.map(person=> person.name !== nameObj.name ? person : response.data))
              setNewName('Enter name')
              setNewNumber('Enter number')
              setConfirmMessage(`${nameObj.name}'s phone number successfully updated`)
              setTimeout(()=>{
                setConfirmMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${nameObj.name} has already been removed from the server`)
              setTimeout(()=> {
                setErrorMessage(null)
              }, 5000)
            })
        }
        return
      }
    }

    personServices
      .create(nameObj)
      .then(returnedPerson => { 
        setPersons(persons.concat(returnedPerson))      
        setNewName('Enter name')
        setNewNumber('Enter number')
        setConfirmMessage(`Added ${nameObj.name}`)
        setTimeout(()=>{
          setConfirmMessage(null)
        }, 5000)
      })
  

  }

  const personToShow = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ConfirmNotification message={confirmMessage}/>
      <ErrorNotification message={errorMessage} />
      <SearchFilter filter={newFilter} change={handleFilter}/>
      <PersonForm info={addInfo} name={newName} namechange={handleAddName} number={newNumber} numberchange={handleAddNumber}/>
      <h2>Numbers</h2>
      <div>
        {personToShow.map(person => 
          <PersonDetail key={person.name} id={person.id} name={person.name} number={person.number} contacts={persons} setContacts={setPersons}/>
          )
        }
      </div>
    </div>
  )
}

export default App
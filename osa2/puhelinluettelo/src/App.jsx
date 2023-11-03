import { useState, useEffect } from 'react'
import personsService from './services/personsService'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getPersons()
      .then(persons => setPersons(persons))
  }, [])

  const addToPersons = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personId = persons.find(person => person.name === newName).id
        const newPerson = { name: newName, number: newNumber }

        personsService
          .update(personId, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : updatedPerson))
            setSuccessMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`${newPerson.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setSuccessMessage(`Added ${addedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (name, id) => {
    if (confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <FilterForm value={filterString} handler={handleFilterInput} />

      <h2>Add a new number</h2>
      <PersonForm submitHandler={addToPersons} nameValue={newName} nameHandler={handleNameInput} numberValue={newNumber} numberHandler={handleNumberInput} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} removeHandler={removePerson} />
    </div>
  )
}

export default App

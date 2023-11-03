const Person = ({ person, removeHandler }) => {
  return (
    <div>
      {`${person.name} ${person.number} `}
      <button onClick={() => removeHandler(person.name, person.id)}>
        delete
      </button>
    </div>
  )
}

const Persons = ({ persons, filterString, removeHandler }) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filterString)).map(person =>
        <Person key={person.id} person={person} removeHandler={removeHandler} />
      )}
    </>
  )
}

export default Persons

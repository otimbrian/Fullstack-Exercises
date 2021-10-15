import React, {useState} from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Person from './components/Person'



const App = (props) => {
  const [person, setPerson] = useState([
    {name: 'Arto Hellas', number : '0775463645', id: 1},
    { name: 'Arto Hellas', number: '040-123456', id: 2 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  
  const filteredPerson = person.filter(
          function (pers){
              return(pers.name.toLowerCase().includes(search.toLowerCase()))
          }
      )
  const rendered = search === ''
          ? person
          :filteredPerson

  const handleSearchChange = (event) => {
      setSearch(event.target.value)
  }
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
      setNewNumber(event.target.value)
  }

  const addPerson = (event) => {

    event.preventDefault()

    if(person.some(value => value.name === newName)){
        alert(`${newName} is already in the phonebook`)
        setNewName('')
        setNewNumber('')
    }
    else{
        const personObject = {
            name : newName,
            number : newNumber,
            id : person.length + 1,
        }
        setPerson(person.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
}

  return(
      <div>
        <h2>Phone Book</h2>
        <Filter infor='Filter Name By' formVal ={search} handler={handleSearchChange}/>

        <h2>Add New Contact</h2>
        <ContactForm action={addPerson} name='Name' contact='Number' nameVal={newName} 
                handler={handleNameChange} numberVal={newNumber} numHandler={handleNumberChange} />
        <h2>Numbers</h2>
        <Person render={rendered} />
      </div>
  )

}

export default App;
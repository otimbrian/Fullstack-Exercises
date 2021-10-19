import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Person from './components/Person'



const App = () => {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(
      () => {
          axios.get('http://localhost:3001/persons').then(
              response => {
                  setPerson(response.data)
              }
          )
      },
      []
  )

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
import React, {useState, useEffect} from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/person'



const App = () => {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(
      () => {
          personService.getAll().then(
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

  const deleteContact = (id) => {
        const pers = person.find(n => n.id === id)
        if(window.confirm(`Delete ${pers.name}`)){
        personService.deleteContact(id).then(
            response => {
                setPerson(person.filter(pers => pers.id !== id))
            }
        )
     }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(person.some(value => value.name === newName)){
        const pers =person.find(p => p.name === newName)
        if(pers.number !== newNumber){
            if(window.confirm(`${newName} is already in Phonebook, replace the number with a new one?`)){
                const changeNumber = {...pers, number:newNumber}
                personService.update(pers.id, changeNumber).then(
                    response => {
                        setPerson(person.map(p => p.id !== pers.id ? p: response.data))
                        setMessage(`${newNumber} Added to Phonebook`)
                        setStatus('success')
                        setTimeout(()=> {
                            setMessage(null)
                            setStatus(null)
                        }, 5000)
                    }
                ).catch(
                    error =>{
                        setMessage(`Information about ${newName} has already been removed from the database`)
                        setStatus('error')
                        setPerson(person.filter(p => p.id !== pers.id))
                        setTimeout(() => {
                            setMessage(null)
                            setStatus(null)
                        }, 5000)
                    }
                )
            }
        }
        else{
            alert(`${newName} already in Phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }
    else{
        const personObject = {
            name : newName,
            number : newNumber,
        }
        personService.create(personObject).then(
            response => {
                setPerson(person.concat(response.data))
                setMessage(`${newName} Added to Phonebook`)
                setStatus('success')
                setTimeout(() => {
                    setMessage(null)
                    setStatus(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
                
            }
        ).catch(
            error => {
                console.log(error.response.data)
                setMessage(`${JSON.stringify(error.response.data)}`)
                setStatus('error')
                setTimeout(() => {
                    setMessage(null)
                    setStatus(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
            }
        )
        
    }
}

  return(
      <div>
        <Notification message={message} status={status}/>
        <h2>Phone Book</h2>
        <Filter infor='Filter Name By' formVal ={search} handler={handleSearchChange}/>

        <h2>Add New Contact</h2>
        <ContactForm action={addPerson} name='Name' contact='Number' nameVal={newName} 
                handler={handleNameChange} numberVal={newNumber} numHandler={handleNumberChange} />
        <h2>Numbers</h2>
        <Person render={rendered} action={deleteContact}/>
      </div>
  )

}

export default App;
import React, {useState} from 'react'

const App = (props) => {
  const [person, setPerson] = useState([
    {name: 'Arto Hellas'}
  ])

  const [newName, setNewName] = useState('')

  return(
      <div>
        <h2>Phone Book</h2>
        <form>
            <div>
                name : <input />
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
        <h2>Numbers</h2>
      </div>
  )

}


export default App;
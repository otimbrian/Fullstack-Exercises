import React, { useState } from 'react'
import Note from './components/Note';


const App = (props) =>{
  const [notes, setnotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)


  const addNote =(event) => {
    event.preventDefault();
    const noteObject = {
        id: notes.length + 1,
        content : newNote,
        important : Math.random() < 0.5,
        date : new Date().toISOString(),
    } 
    setnotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(notes => notes.important === true)



  return(
    <div>
        <h1>Notes</h1>
        <ul>
            {notesToShow.map(note => 
              <Note key={note.id} note={note}/>)}
        </ul>
        <div>
              <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'Important' : 'All'}
              </button>
        </div>
        <form onSubmit={addNote}>
              <input value={newNote} onChange={handleNoteChange}/>
              <button type='submit'>save</button>
        </form>
  </div>
  )
} 


export default App;

import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import Footer from './components/Footer';
import noteServices from './services/notes'
import Notification from './components/Notification'
import './index.css'



const App = () => {
    const [notes, setnotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect( () => {
        noteServices.getAll().then(
        initialNote => {
            setnotes(initialNote)
        }
        )

    }, [])


    const addNote =(event) => {
        event.preventDefault();
        const noteObject = {
            content : newNote,
            important : Math.random() < 0.5,
            date : new Date().toISOString(),
        } 
    
    noteServices.create(noteObject).then(
      returnedNote => {
        setnotes(notes.concat(returnedNote));
        setNewNote('');
      }
    )
  }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(notes => notes.important === true)

        const toggleImportanceOf = (id) => {

        const note = notes.find(n => n.id === id)
        const changeNote = {...note, important: !note.important}

        noteServices.update(id, changeNote).then(
            returnedNote => {
            setnotes(notes.map(note => note.id !== id ? note : returnedNote))
            }
        ).catch(
            error => {
                setErrorMessage(`The note '${note.content}' was already deleted from the server`)
                setTimeout(() =>{
                    setErrorMessage(null)
                }, 5000) 
                setnotes(notes.filter(n => n.id !== id))
            }
        )
        }

    return(
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <ul>
                {notesToShow.map(note => 
                <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
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
            <Footer />
    </div>
    )
} 


export default App;

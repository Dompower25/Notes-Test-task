import React, {useState} from 'react';
import NoteItem from './components/NoteItem';
import NotesForm from './components/NotesForm';
import './style/App.css';


function App() {

  const [note, setNote] = useState([]);

  const removeNote = (id) => {
setNote(note.filter((i) => i.id !== id))
  };

  return (
    <div className="App">
      <strong>NOTES APP</strong>
      <NotesForm setNote={setNote} note={note} />
      <hr></hr>

      <div>
        <select className="COMPONENT sorting ">
          <option value="value1">по тегу</option>
          <option value="value1">по дате</option>
        </select>
      </div>

      {note.length !== 0 ? (
        <h1 style={{ textAlign: "center" }}>список заметок</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>нет заметок</h1>
      )}

      {note.map(({ id, bodyNote, tegs }) => (
        <NoteItem
          setNote={setNote}
          deleteNote={() => removeNote(id)}
          bodyNote={bodyNote}
          id={id}
          teg={tegs}
          key={id}
        />
      ))}
    </div>
  );
}

export default App;
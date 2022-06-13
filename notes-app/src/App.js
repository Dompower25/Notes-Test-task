import React, { useState } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import "./style/App.css";

function App() {
  const [note, setNote] = useState([]);
  const [bodyNote, setbodyNote] = useState("");

  const removeNote = (id) => {
    setNote(note.filter((i) => i.id !== id));
  };

  const addTegs = (obj) => {
    const regex = /#\w+/gm;
    bodyNote.match(regex).forEach((teg, i) => {
      return (obj.tegs[i] = [teg]);
    });
  };

  const textNotTegs = (text, obj) => {
    return (obj.tegs = [text]);
  };

  const addNewNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      bodyNote,
      tegs: [],
    };

    bodyNote.search(/#\w+/gm) == 0
      ? addTegs(newNote)
      : textNotTegs("no tags", newNote);

    setNote([...note, newNote]);
    setbodyNote("");
  };

  return (
    <div className="App">
      <strong>NOTES APP</strong>
      <NotesForm addNote={addNewNote} setbodyNote={setbodyNote} />
      <hr></hr>

      {note.length !== 0 ? (
        <h1 style={{ textAlign: "center" }}>список заметок</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>нет заметок</h1>
      )}

      {note.map(({ id, bodyNote, tegs }) => (
        <NoteItem
          note={note}
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

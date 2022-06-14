import React, { useState } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.css";
import {useSearch} from "./hooks/useSearch"


function App() {
  const [note, setNote] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTeg, setSearchTeg] = useState("");
  const searchTags = useSearch(note, searchTeg);

  const addTegs = (obj) => {
    const regex = /#\w+/gm;
    bodyNote.match(regex).forEach((teg, i) => {
      return (obj.tegs[i] = teg);
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
  
  const sortedNote = (sort) => {
    setSearchTeg(sort);
  };

  const removeNote = (id) => {
    setNote(note.filter((i) => i.id !== id));
  };

  return (
    <div className="App">
      <strong>NOTES APP</strong>
      <NotesForm
        bodyNote={bodyNote}
        setbodyNote={setbodyNote}
        addNewNote={addNewNote}
      />
      <hr></hr>
      <SearchInput value={searchTeg} note={note} onChange={sortedNote} />
      {searchTags.map(({ id, bodyNote, tegs }) => (
        <NoteItem
          note={searchTeg}
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

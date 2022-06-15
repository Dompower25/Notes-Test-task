import React, { useCallback, useState } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.css";
import { useSearch } from "./hooks/useSearch";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [note, setNote] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTeg, setSearchTeg] = useState("");
  const searchTags = useSearch(note, searchTeg);
  console.log(note);
  async function fetchNotesItem() {
    try {
      const url =
        "https://obbgzeamtcqhzsiwmktq.supabase.co/rest/v1/notes-item?select=*";
      const key =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmd6ZWFtdGNxaHpzaXdta3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyOTE4OTEsImV4cCI6MTk3MDg2Nzg5MX0.Y5_Qju8baHUSW6JFK62TgK4vlFF-tHBafrSYSU0gJ4w";

      const supabase = createClient(url, key);

      const { data: items, error } = await supabase.from("todos").select("*");
      setNote(items);
    } catch (e) {
      console.error(e);
    }
  }

  async function updateNote() {
    try {
      const url =
        "https://obbgzeamtcqhzsiwmktq.supabase.co/rest/v1/notes-item?some_column=eq.someValue";
      const key =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmd6ZWFtdGNxaHpzaXdta3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyOTE4OTEsImV4cCI6MTk3MDg2Nzg5MX0.Y5_Qju8baHUSW6JFK62TgK4vlFF-tHBafrSYSU0gJ4w";

      const supabase = createClient(url, key);

      const { data } = await supabase(url, key).from("notes-item").update(note);
    } catch (e) {
      console.log(e);
    }
  }

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
      {searchTags.map(({ bodyNote, id, tegs }) => (
        <NoteItem
          addNewNote={addNewNote}
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

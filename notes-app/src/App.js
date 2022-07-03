import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.css";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [notes, setNotes] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const noteItems = useSearch(notes, searchTag); //хук поиска тегов
  const axios = require("axios");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    await axios
      .get("https://62ab026ea62365888bd2271d.mockapi.io/Notes/")
      .then((res) => {
        return setNotes(res.data);
      });
  }

  //добавление тегов в заметку
  const addTags = (obj, text) => {
    const regex = /#\w+/gm;
    obj.tegs = text.match(regex);
  };

  const textNotTags = (text, obj) => {
    return (obj.tegs = [text]);
  };

  //создание новой заметки
  const addNewNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Number,
      bodyNote,
      tegs: [],
      timeCreate: Date.now(),
    };

    bodyNote.search(/#\w+/gm) !== -1
      ? addTags(newNote, bodyNote)
      : textNotTags("no tags", newNote);
    let backup = [];
    setNotes((note) => {
      backup = note;
      return [...note, newNote];
    });

    axios
      .post("https://62ab026ea62365888bd2271d.mockapi.io/Notes/", newNote)
      .then((response) => {
        console.log("Create note", response.data);
      })
      .catch((err) => {
        console.log(err);
        setNotes(backup);
      });
    setbodyNote("");
  };

  //удаление заметки
  const removeNote = (id) => {
    setNotes(notes.filter((i) => i.id !== id));
    axios
      .delete(`https://62ab026ea62365888bd2271d.mockapi.io/Notes/${id}`)
      .then((response) => console.log("Delete note", response.data))
      .catch((err) => console.log(err));
  };

  //редактирование заметки
  const editNotes = (newText, timeCreate, id) => {
    const newNote = {
      id: id,
      bodyNote: newText,
      tegs: [],
      timeCreate: timeCreate,
    };

    newText.search(/#\w+/gm) !== -1
      ? addTags(newNote, newText)
      : textNotTags("no tags", newNote);

    axios
      .put(`https://62ab026ea62365888bd2271d.mockapi.io/Notes/${id}`, newNote)
      .then((response) => {
        console.log("Заметка изменена", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <strong>NOTES APP</strong>
      <NotesForm //форма создания заметки
        bodyNote={bodyNote}
        setbodyNote={setbodyNote}
        addNewNote={addNewNote}
      />
      <hr></hr>
      <SearchInput value={searchTag} note={notes} onChange={setSearchTag} />
      {noteItems.map(({ bodyNote, id, tegs, timeCreate }) => (
        <NoteItem
          edit={(e) => {
            editNotes(e, timeCreate, id);
          }}
          note={searchTag}
          deleteNote={() => removeNote(id)}
          bodyNote={bodyNote}
          id={id}
          tag={tegs}
          key={timeCreate}
          timeCreate={timeCreate}
        />
      ))}
    </div>
  );
}

export default App;
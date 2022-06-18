import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.css";
import { useSearch } from "./hooks/useSearch";

function App() {
  const [note, setNote] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTeg, setSearchTeg] = useState("");
  const searchTags = useSearch(note, searchTeg); //хук поиска тегов
  const axios = require("axios");

  console.log(searchTeg);
  useEffect(() => {
    console.log("SYNC");
    axios
      .get("https://62ab026ea62365888bd2271d.mockapi.io/Notes/")
      .then((res) => setNote(res.data));
  }, []);

  const fetchNotes = () => {
    console.log("fetch");
    axios
      .get("https://62ab026ea62365888bd2271d.mockapi.io/Notes/")
      .then((res) => {
        return setNote(res.data);
      });
  };

  const addTegs = (obj, text) => {
    //добавление тегов в созданную заметку
    const regex = /#\w+/gm;
    text.match(regex).forEach((teg, i) => {
      return (obj.tegs[i] = teg);
    });
  };

  const textNotTegs = (text, obj) => {
    return (obj.tegs = [text]);
  };

  const addNewNote = (e) => {
    //создание новой заметки
    e.preventDefault();
    const newNote = {
      id: Number,
      bodyNote,
      tegs: [],
      timeCreate: Date.now(),
    };

    bodyNote.search(/#\w+/gm) == 0
      ? addTegs(newNote, bodyNote)
      : textNotTegs("no tags", newNote);
    let backup = [];
    setNote((note) => {
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
        setNote(backup);
      });
    setbodyNote("");
  };

  const sortedNote = (sort) => {
    setSearchTeg(sort);
  };

  //удаление заметки
  const removeNote = (id) => {
    setNote(note.filter((i) => i.id !== id));
    axios
      .delete(`https://62ab026ea62365888bd2271d.mockapi.io/Notes/${id}`)
      .then((response) => console.log("Delete note", response.data))
      .catch((err) => console.log(err));
  };

  //редактирование заметки
  const editNotes = (newText, timeCreate, id) => {
    console.log(newText);

    const newNote = {
      id: id,
      bodyNote: newText,
      tegs: [],
      timeCreate: timeCreate,
    };

    newText.search(/#\w+/gm) == 0
      ? addTegs(newNote, newText)
      : textNotTegs("no tags", newNote);
    console.log(newNote);
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
      <SearchInput value={searchTeg} note={note} onChange={sortedNote} />
      {searchTags.map(({ bodyNote, id, tegs, timeCreate }) => (
        <NoteItem //заметка
          edit={(e) => {
            editNotes(e, timeCreate, id);
          }}
          note={searchTeg}
          deleteNote={() => removeNote(id)}
          bodyNote={bodyNote}
          id={id}
          teg={tegs}
          key={timeCreate}
          timeCreate={timeCreate}
        />
      ))}
    </div>
  );
}

export default App;

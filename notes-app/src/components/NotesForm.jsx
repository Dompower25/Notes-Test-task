import React, {useState} from 'react';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';

const NotesForm = ({setNote, note}) => {
  const [bodyNote, setbodyNote] = useState("");

  const regular_hastag = /#\S+/;

  const addNewNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      bodyNote,
    };
    setNote([...note, newNote]);
    setbodyNote("");
  };

  return (
    <div className="row_column">
      <form>
        <MyInput
          value={bodyNote}
          onChange={
            (event) => setbodyNote(event.target.value)
          }
          type="text"
          placeholder="создайте заметку"
        ></MyInput>
        <MyButton onClick={addNewNote}>добавить заметку</MyButton>
      </form>
    </div>
  );
};

export default NotesForm
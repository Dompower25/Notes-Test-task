import React from 'react';
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';

const NotesForm = ({ addNote, setbodyNote }) => {
  return (
    <div className="row_column">
      <form>
        <MyInput
          onChange={(event) => setbodyNote(event.target.value)}
          type="text"
          placeholder="создайте заметку"
        ></MyInput>
        <MyButton onClick={addNote}>добавить заметку</MyButton>
      </form>
    </div>
  );
};

export default NotesForm
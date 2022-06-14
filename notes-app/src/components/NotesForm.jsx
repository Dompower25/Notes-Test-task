import React from "react";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

const NotesForm = ({ bodyNote, setbodyNote, addNewNote }) => {
  return (
    <div className="row_column">
      <form>
        <MyInput
          value={bodyNote}
          onChange={(event) => setbodyNote(event.target.value)}
          type="text"
          placeholder="создайте заметку"
        ></MyInput>
        <MyButton onClick={addNewNote}>добавить заметку</MyButton>
      </form>
    </div>
  );
};

export default NotesForm;
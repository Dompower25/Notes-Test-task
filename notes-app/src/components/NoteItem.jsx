import React from 'react'
import MyButton from '../UI/MyButton';

function NoteItem({ bodyNote, teg, id, deleteNote, setNote }) {
  const maxDate = new Date(id);
  const time = maxDate.toLocaleString();
  return (
    <div className="note__box">
      <div className="note__content">
        <div>
          <textarea
            onChange={() => setNote}
            className="note"
            value={bodyNote}
          ></textarea>
          <div className="tegs__box row">
            <span className="tegSt">{teg}</span>
            <span>{time}</span>
          </div>
        </div>
        <div className="note__btn">
          <MyButton onClick={deleteNote}>удалить</MyButton>
          <MyButton>редактировать</MyButton>
        </div>
      </div>
    </div>
  );
}

export default NoteItem
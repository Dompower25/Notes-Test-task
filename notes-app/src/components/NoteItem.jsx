import React, {useState} from 'react'
import MyButton from '../UI/MyButton';
import st from '../style/NoteItem.module.css'


function NoteItem({ bodyNote, teg, id, deleteNote, note, setNote }) {
  const maxDate = new Date(id);
  const time = maxDate.toLocaleString();
  const [state, setState] = useState(bodyNote);
  return (
    <div className="note__box">
      <div className="note__content">
        <div>
          <textarea
            disabled
            onChange={(e) => setState(e.target.bodyNote)}
            className={st.note}
            value={state}
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
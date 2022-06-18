import React, { useState } from "react";
import MyButton from "../UI/MyButton";
import st from "../style/NoteItem.module.css";

function NoteItem({ bodyNote, teg, deleteNote, note, edit, timeCreate }) {
  const maxDate = new Date(timeCreate);
  const time = maxDate.toLocaleString();
  const [state, setState] = useState(bodyNote);
  const [editNote, setEditNode] = useState(true);

  
  return (
    <div className="note__box">
      <div className="note__content">
        <div>
          <textarea
            disabled={editNote}
            onChange={(e) => setState(e.target.value)}
            className={st.note}
            value={state}
          ></textarea>
          <div className="tegs__box row">
            <div>
              {teg.map((t) => (
                <span className={note === t ? st.blue : "tegSt"} key={t}>
                  {t + " "}
                </span>
              ))}
            </div>
            <span>{time}</span>
          </div>
        </div>
        <div className="note__btn">
          <MyButton onClick={deleteNote}>удалить</MyButton>
          <MyButton
            onClick={() => {
              setEditNode(false);
            }}
          >
            редактировать
          </MyButton>
          <MyButton onClick={() => { edit(state);  setEditNode(true); }}>сохранить</MyButton>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;

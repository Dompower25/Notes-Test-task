import React from 'react'

const SearchInput = ({ note, onChange, value }) => {
  return (
    <div className="row search__line row__mobile">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search"
        placeholder="search #tag"
      ></input>
      {note.length !== 0 ? (
        <h2 style={{ textAlign: "center" }}>список заметок</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>нет заметок</h2>
      )}
    </div>
  );
};

export default SearchInput
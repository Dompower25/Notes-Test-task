import React from 'react'

const SearchInput = ({ note, onChange, value }) => {
  return (
    <div className="row">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search"
        placeholder="search #tag"
      ></input>
      {note.length !== 0 ? (
        <h1 style={{ textAlign: "center" }}>список заметок</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>нет заметок</h1>
      )}
    </div>
  );
};

export default SearchInput
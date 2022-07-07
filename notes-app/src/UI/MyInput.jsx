import React from "react";
import style from "./MyInput.module.scss";

const MyInput = (props) => {
  return (
    <textarea
      className={style.input}
      {...props}
    ></textarea>
  );
};

export default MyInput;

import React from "react";
import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className={style["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;

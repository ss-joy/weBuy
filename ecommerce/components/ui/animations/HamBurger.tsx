import React, { useState } from "react";
import style from "./HamBurger.module.css";
const HamBurger = (): JSX.Element => {
  const [startAnimation, setStartAnimation] = useState<boolean>(false);
  function addAnimation() {
    setStartAnimation((prev) => {
      return !prev;
    });
  }
  return (
    <div onClick={addAnimation} className={style.hamBurger}>
      <hr className={startAnimation ? style.bar1Animation : ""} />
      <hr className={startAnimation ? style.bar2Animation : ""} />
      <hr className={startAnimation ? style.bar3Animation : ""} />
    </div>
  );
};

export default HamBurger;

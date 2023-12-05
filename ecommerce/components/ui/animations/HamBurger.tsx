import React, { useContext, useState } from "react";
import style from "./HamBurger.module.css";
import { responsivePanelContext } from "@/contexts/responsive-panel";
const HamBurger = (): JSX.Element => {
  const resCtx = useContext(responsivePanelContext);

  return (
    <div onClick={resCtx?.addAnimation} className={style.hamBurger}>
      <hr className={resCtx?.startAnimation ? style.bar1Animation : ""} />
      <hr className={resCtx?.startAnimation ? style.bar2Animation : ""} />
      <hr className={resCtx?.startAnimation ? style.bar3Animation : ""} />
    </div>
  );
};

export default HamBurger;

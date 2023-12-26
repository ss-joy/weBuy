import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
interface ErrorMsgProp {
  msg?: string;
}
const ErrorMsg = (props: ErrorMsgProp): JSX.Element => {
  return (
    <div className="border-slate-400 flex flex-col justify-center items-center border-4 rounded-md p-4 mt-20 mx-auto lg:mx-8 xl:mx-20 2xl:mx-40">
      <div>
        <ExclamationTriangleIcon color="grey" className="w-56 h-56" />
      </div>
      <div className="text-gray-500 text-4xl text-center">
        {props.msg
          ? props.msg
          : "Oops! Something went wrong ! Please try again!"}
      </div>
    </div>
  );
};

export default ErrorMsg;

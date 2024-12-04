import React from "react";

type ErrorMessageProps = {
  errorMessage: string | undefined;
};
const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <p className="text-red-700 w-full">{errorMessage ? errorMessage : null}</p>
  );
};

export default ErrorMessage;

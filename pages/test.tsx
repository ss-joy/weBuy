import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { date } from "zod";
const test = () => {
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    handleSubmit,
    register,
  } = useForm();
  function onSubmit(data, e: React.FormEvent<HTMLFormElement>) {
    console.log(data);
    console.log(e);
  }
  function onError() {
    console.log("error");
  }
  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          type="text"
          {...register("userName", {
            required: true,
          })}
        />
        <button type="submit">submit form</button>
      </form>
    </div>
  );
};

export default test;

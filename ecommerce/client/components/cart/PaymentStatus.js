import React from "react";

const PaymentStatus = ({ status, msg }) => {
  if (status === 0) {
    return (
      <p className="mt-20 border-2 p-7 rounded-md text-xl bg-red-500 text-white font-bold ">
        {msg}
      </p>
    );
  }

  return (
    <p className="mt-20 border-2 p-7 rounded-md text-white bg-green-500 text-xl font-bold ">
      {msg}
    </p>
  );
};

export default PaymentStatus;

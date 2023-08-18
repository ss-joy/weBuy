import BankContext from "@/contexts/bank-context";
import { getSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";

export default function BankConnect() {
  const [sessionEmail, setSessionEmail] = useState("");
  useEffect(() => {
    getSession().then((session) => {
      console.log(session);
      setSessionEmail(session.user.email);
    });
  }, []);
  //   const [bankUser, setBankUser] = useState({
  //     email: "",
  //     name: "",
  //     money: "",
  //   });
  const bankCtx = useContext(BankContext);
  console.log(bankCtx);
  useEffect(() => {
    //get
  });
  function getBank() {
    fetch("http://localhost:4000/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: sessionEmail,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((ans) => {
        console.log(ans);
        alert(
          `Write id down.It wont be given again.Your secret is${ans.secret}`
        );
        bankCtx.setConnectedToBank(true);
        // setBankUser({
        //   email: ans.user.email,
        //   name: ans.user.name,
        //   money: ans.user.money,
        // });
        bankCtx.setBankDetails({
          name: ans.user.name,
          email: ans.user.email,
          amount: ans.user.money,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <section>
      <button
        className="btn2 m-auto"
        onClick={() => {
          getBank();
        }}
      >
        connect to bank
      </button>
      {bankCtx.connectedToBank ? (
        <div className="bg-orange-300 text-center w-1/3 p-8 m-auto mt-20 rounded-md shadow-md shadow-orange-400 text-orange-800 text-3xl">
          <div>name :{bankCtx.bankDetails.name}</div>
          <div>email :{bankCtx.bankDetails.email}</div>
          <div>amount :{bankCtx.bankDetails.amount}</div>
        </div>
      ) : (
        <p>bank is not yet connected</p>
      )}
    </section>
  );
}

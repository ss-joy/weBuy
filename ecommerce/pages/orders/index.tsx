import OneOrder from "@/components/orders/Order";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ShowOrders(): JSX.Element {
  useEffect(() => {
    async function getUserSession() {
      const userSession = await getSession();
      // userSession?.user!.user_id;
      //@ts-ignore
      const userEmail = userSession?.user!.email;
      const response = await fetch(
        `http://localhost:3001/api/orders/${userEmail}`
      );
      const response2 = await response.json();
      console.log(response2);
    }
    getUserSession();
  }, []);

  return (
    <div>
      <ul>
        {/* {data &&
          data.ans.map((e, id) => {
            return (
              // <li
              //   key={id}
              //   className="flex justify-between border-2 border-orange-400 mt-4 rounded p-4 font-bold items-center"
              // >
              //   <div>{e.address}</div>
              //   <div>{e.cost}</div>
              //   <div>{e.productQuantity}</div>
              //   <div>email:{e.email}</div>
              //   <div>{e.trxId}</div>
              //   {e.status && pendingDiv}
              //   <div className="border-2 border-orange-400 p-1 rounded bg-white">
              //     mark as delivered
              //   </div>
              // </li>
              <OneOrder e={e} key={id} />
            );
          })} */}
        ok
      </ul>
    </div>
  );
}

import OneOrder from "@/components/orders/Order";
import { useEffect, useState } from "react";

export default function ShowOrders() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/get-transactions")
      .then((resp) => {
        return resp.json();
      })
      .then((anss) => {
        console.log(anss);
        setData(anss);
      });
  }, []);

  return (
    <div>
      <ul>
        {data &&
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
          })}
      </ul>
    </div>
  );
}

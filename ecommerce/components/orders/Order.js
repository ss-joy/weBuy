import { useSession } from "next-auth/client";

export default function OneOrder({ e }) {
  const [session, loading] = useSession();
  const pendingDiv = <div className="bg-orange-400 p-2 rounded">Pending</div>;
  const successDiv = <div className="bg-green-400 p-2 rounded">Delivered</div>;
  function makeOrderDone() {
    fetch(`http://localhost:4000/make-order-done?txid=${e.trxId}`)
      .then((ans) => {
        return ans.json();
      })
      .then((anss) => {
        console.log(anss);
        alert("Order status changed.please refresh");
      });
  }
  return (
    <li className="flex justify-between border-2 border-orange-400 mt-4 rounded p-4 font-bold items-center">
      <div>{e.address}</div>
      <div>{e.cost}</div>
      <div>{e.productQuantity}</div>
      <div>email:{e.email}</div>
      <div>{e.trxId}</div>
      {e.status === "pending" ? pendingDiv : successDiv}

      {session.user.email === "supplier.com" ? (
        <button
          onClick={makeOrderDone}
          className="border-2 border-orange-400 p-1 rounded bg-white"
        >
          mark as delivered
        </button>
      ) : null}
    </li>
  );
}

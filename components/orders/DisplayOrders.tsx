import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import OrderTable from "./OrderTable";
type TransactionItem = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  _id: string;
};

type DisplayTransactionsTableProps = {
  trxData: {
    trxId: string;
    totalCost: number;
    buyerId: string;
    buyerEmail: string;
    trxDate: Date;
    trxStatus: string;
    _id: string;
    transactionsItemsLists: TransactionItem[];
    _v: 0;
  }[];
};
function DisplayOrders({ trxData }: DisplayTransactionsTableProps) {
  return (
    <>
      {trxData.map((trx) => {
        return (
          <div
            key={trx.trxId}
            className="shadow shadow-slate-400 rounded mx-2 md:mx-10 md:p-2 lg:mx-40 my-4 lg:my-8"
          >
            <header className="p-3 flex justify-between">
              <div id="order-details ">
                <h1 className="text-2xl text-slate-700 font-bold mb-2">
                  Transaction Id
                </h1>
                <p className="text-slate-500 mb-2 w-64 overflow-hidden md:w-full">
                  {trx.trxId} <span className="sm:hidden">...</span>
                </p>
                <p className="text-slate-600 mb-2 underline ">
                  {new Date(trx.trxDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZone: "UTC",
                  })}
                </p>
              </div>
              <p
                id="order-status"
                className={cn(
                  "rounded-md font-bold px-3 py-3 flex justify-center items-center text-white text-xs sm:text-lg h-[20px] text-center",
                  {
                    "bg-orange-400": trx.trxStatus === "Pending",
                    "bg-green-400": trx.trxStatus === "Delivered",
                  }
                )}
              >
                {trx.trxStatus}
              </p>
            </header>
            <div>
              <OrderTable orderItem={trx.transactionsItemsLists} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DisplayOrders;

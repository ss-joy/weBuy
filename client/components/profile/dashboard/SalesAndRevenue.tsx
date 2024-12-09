import { DollarSignIcon, ShoppingBag } from "lucide-react";
import React from "react";
import { Separator } from "../../ui/separator";
import Loading from "../../ui/Loading";
import ErrorMsg from "../../ui/ErrorMsg";
type Product = {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerName: string;
  sellerId: string;
  sellCount: number;
};
type SalesAndRevenueProps = {
  data: Product[];
  isLoading: boolean;
  error: any;
};
function SalesAndRevenue({ isLoading, error, data }: SalesAndRevenueProps) {
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return <ErrorMsg />;
  }
  return (
    <div className="flex gap-4 my-4">
      <div
        id="sales"
        className="shadow-md shadow-slate-400 rounded-2xl p-6 flex-grow"
      >
        <h2 className="flex items-center justify-between mb-2  rounded-md p-2">
          <span className="text-4xl text-slate-600 font-medium">Sales</span>
          <span>
            <ShoppingBag className="stroke-green-700 bg-green-100 rounded-full size-[70px]" />
          </span>
        </h2>
        <Separator className="my-5" />
        <p className="font-bold text-3xl">
          +
          {data.length === 0
            ? 0
            : data.reduce((prev, curr) => {
                return prev + curr.price * curr.sellCount;
              }, 0)}
        </p>
      </div>
      <div
        id="sales"
        className="shadow-md shadow-slate-400 rounded-md px-6 py-4 flex-grow"
      >
        <h2 className="flex items-center justify-between mb-2">
          <span className="text-4xl font-medium">Sales</span>
          <span>
            <DollarSignIcon className="text-slate-400" />
          </span>
        </h2>
        <Separator className="mb-3" />
        <p className="font-bold text-3xl">
          +
          {data.length === 0
            ? 0
            : data.reduce((prev, curr) => {
                return prev + curr.price * curr.sellCount;
              }, 0)}
        </p>
      </div>
    </div>
  );
}

export default SalesAndRevenue;

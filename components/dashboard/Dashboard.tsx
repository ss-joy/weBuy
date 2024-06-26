import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "../ui/Loading";
import ErrorMsg from "../ui/ErrorMsg";
import SalesAndRevenue from "./SalesAndRevenue";
import { makeGetRequest } from "@/queries";
const NoSSRBarChart = dynamic(() => import("../Charts/BarChart"), {
  ssr: false,
});
const NoSSRPieChart = dynamic(() => import("../Charts/PieChartGraph"), {
  ssr: false,
});
type DashboardProps = {
  userId: string | null;
};

function Dashboard({ userId }: DashboardProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["single-user-sold-products-list", userId],
    queryFn: () => {
      return makeGetRequest(`/api/user/products/${userId}`);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return <ErrorMsg />;
  }
  return (
    <div className="mx-auto">
      <h1 className="font-bold my-8 pl-3 text-3xl md:text-5xl text-orange-600">
        Your Dashboard
      </h1>
      <h2 className="font-bold text-3xl text-slate-700 mb-6 md:text-4xl  underline pl-3">
        Overview of all products you are selling
      </h2>
      <NoSSRBarChart data={data?.data} isLoading={isLoading} error={error} />
      <h2 className="font-bold text-3xl text-slate-700 my-4 md:text-4xl underline pl-3">
        Best 4 performing products
      </h2>

      <NoSSRPieChart data={data?.data} isLoading={isLoading} error={error} />

      <SalesAndRevenue data={data?.data} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Dashboard;

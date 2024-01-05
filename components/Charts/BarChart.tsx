import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ErrorMsg from "../ui/ErrorMsg";
import Loading from "../ui/Loading";

type Product = {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerName: string;
  sellerId: string;
  sellCount: number;
};
type BarChartProps = {
  data: Product[];
  isLoading: boolean;
  error: any;
};
function BarChartGraph({ data, isLoading, error }: BarChartProps) {
  const barChartArray = data?.map((product) => {
    return {
      name: product.name,
      sells: product.sellCount ? product.sellCount : 0,
    };
  });
  const renderCustomBarLabel = ({
    x,
    y,
    width,
    value,
  }: {
    value: number;
    width: number;
    height: number;
    x: number;
    y: number;
    payload: number;
  }) => {
    return (
      <text
        style={{
          fontSize: "22px",
        }}
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-10}
      >{`sold: ${value} units`}</text>
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
    return <ErrorMsg />;
  }
  if (data.length === 0) {
    return (
      <p className="text-slate-400 text-center mx-auto w-[500px]">
        Hmm!!You have to sell some products to check this page.
      </p>
    );
  }
  return (
    <div
      id="graph-parent"
      className="h-[100vh] w-[300px] pt-20 md:w-[1024px] lg:-[1500px]"
    >
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart height={500} data={barChartArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            fontSize={"18"}
            width={2}
            padding={{
              left: 0,
              right: 0,
            }}
          />
          <YAxis stroke="#8884d8" fontSize={25} />
          <Tooltip
            contentStyle={{
              fontSize: "22px",
              color: "rgb(100, 116, 139)",
            }}
            labelStyle={{
              fontSize: "25px",
            }}
          />

          <Legend />
          <Bar
            dataKey="sells"
            fill="#8884d8"
            barSize={40}
            label={renderCustomBarLabel}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartGraph;
// implementation without the responsive Container.
// required overflow stuuff iin parent component to work in all screens

// <BarChart width={900} height={500} data={barChartArray}>
// <CartesianGrid strokeDasharray="3 3" />
// <XAxis
//   dataKey="name"
//   fontSize={"18"}
//   width={2}
//   padding={{
//     left: 0,
//     right: 0,
//   }}
// />
// <YAxis stroke="#8884d8" fontSize={25} />
// <Tooltip
//   contentStyle={{
//     fontSize: "22px",
//     color: "rgb(100, 116, 139)",
//   }}
//   labelStyle={{
//     fontSize: "25px",
//   }}
// />

// <Legend />
// <Bar
//   dataKey="sells"
//   fill="#8884d8"
//   barSize={40}
//   label={renderCustomBarLabel}
// />
// </BarChart>

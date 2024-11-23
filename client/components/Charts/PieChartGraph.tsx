import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Loading from "../ui/Loading";
import ErrorMsg from "../ui/ErrorMsg";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  index: number;
  innerRadius: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
type Product = {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerName: string;
  sellerId: string;
  sellCount: number;
};
type PieChartProps = {
  data: Product[];
  isLoading: boolean;
  error: any;
};
function PieChartGraph({ data, error, isLoading }: PieChartProps) {
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
        Hmm!!You have to sell some products to see insights.
      </p>
    );
  }
  return (
    <ResponsiveContainer
      width={370}
      height={370}
      style={{
        margin: "15px auto",
      }}
    >
      <PieChart width={500} height={500}>
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
          dataKey="sellCount"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartGraph;

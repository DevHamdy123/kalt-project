"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 1. تعريف واجهة البيانات
export interface SalesData {
  date: string;
  revenue: number;
}

// 2. تعريف واجهة الخصائص
interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#7d8da1"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            width={80}
            stroke="#7d8da1"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#202528",
              borderRadius: "10px",
              border: "none",
              color: "#fff",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ color: "#41f1b6", fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7380ec"
            strokeWidth={4}
            dot={{ r: 4, fill: "#7380ec", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#41f1b6", stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

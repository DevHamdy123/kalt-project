"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface SalesData {
  date: string;
  revenue: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[400px] w-full mt-6 animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
    );
  }

  // Handle empty state gracefully
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] w-full mt-6 flex items-center justify-center bg-zinc-50 dark:bg-[#181a1e] rounded-xl border border-zinc-200 dark:border-[#313338]">
        <p className="text-[#7d8da1] dark:text-zinc-400 font-medium">
          No sales data available yet.
        </p>
      </div>
    );
  }

  // Dynamic colors based on the active theme
  const isDark = resolvedTheme === "dark";
  const tooltipBg = isDark ? "#202528" : "#ffffff";
  const tooltipText = isDark ? "#ffffff" : "#363949";
  const gridColor = isDark ? "#313338" : "#f0f0f0";

  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
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
              backgroundColor: tooltipBg,
              borderRadius: "10px",
              border: `1px solid ${gridColor}`,
              color: tooltipText,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ color: "#ff5c00", fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ff5c00"
            strokeWidth={4}
            dot={{ r: 4, fill: "#ff5c00", strokeWidth: 2, stroke: tooltipBg }}
            activeDot={{ r: 6, fill: "#363949", stroke: "#ff5c00" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

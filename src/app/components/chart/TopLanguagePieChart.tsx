"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

interface LanguageData {
  name: string;
  value: number;
  color?: string;
}

// label custom di dalam Pie
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TopLanguagesChart() {
  const [data, setData] = useState<LanguageData[]>([]);

  useEffect(() => {
    const fetchDataLanguages = async () => {
      const res = await fetch("/api/github/topLanguages");
      const data = await res.json();
      setData(data);
      // console.log(data);
    };
    fetchDataLanguages(); // << ini wajib biar jalan
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-xl font-bold mb-4">🔥 Top Languages</h3>
      <PieChart width={400} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color || "#ccc"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

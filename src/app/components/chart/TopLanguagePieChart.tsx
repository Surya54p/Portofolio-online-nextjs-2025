"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";

interface LanguageData {
  name: string;
  value: number;
  color?: string;
}

export default function TopLanguagesChart() {
  const [data, setData] = useState<LanguageData[]>([]);

  useEffect(() => {
    const fetchDataLanguages = async () => {
      const res = await fetch("/api/github/topLanguages");
      const data = await res.json();
      setData(data);
    };
    fetchDataLanguages();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <PieChart width={400} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={false} // label dimatikan
          labelLine={false}
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

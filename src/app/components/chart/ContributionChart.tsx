"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Day = { date: string; contributionCount: number };

export default function ContributionBarChart() {
  const [data, setData] = useState<Day[]>([]);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const getColor = (count: number) => {
    if (count < 3) return "#bbf7d0"; // hijau muda
    if (count < 6) return "#4ade80"; // hijau normal
    return "#166534"; // hijau tua
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={(d) => {
            const date = new Date(d);
            return date.getDate() === 1
              ? date.toLocaleDateString("id-ID", { month: "short" })
              : "";
          }}
        />
        <YAxis allowDecimals={false} />
        <Tooltip
          labelFormatter={(d) =>
            new Date(d).toLocaleDateString("id-ID", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          }
          formatter={(v) => [`${v}`, "Contributions"]}
        />
        <Bar dataKey="contributionCount">
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={getColor(entry.contributionCount)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Treemap, ResponsiveContainer } from "recharts";

// Komponen custom biar bisa style rect + label
const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, size } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: "#22c55e", // hijau solid
          stroke: "#fff",
        }}
      />
      {width > 60 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          fontWeight={100} // setara extralight
        >
          {name}: {size}
        </text>
      )}
    </g>
  );
};

export default function ContributionChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/github/contributions");
      const json = await res.json();

      // kumpulin kontribusi per bulan
      const byMonth: Record<string, number> = {};

      json.days.forEach((d: any) => {
        const month = new Date(d.date).toLocaleDateString("id-ID", { month: "short" });
        byMonth[month] = (byMonth[month] || 0) + d.contributionCount;
      });

      const formatted = Object.entries(byMonth).map(([month, commits]) => ({
        name: month,
        size: commits,
        color: "#22c55e", // hijau semua
      }));

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap data={data} dataKey="size" aspectRatio={4 / 3} stroke="#fff" content={<CustomizedContent />} />
    </ResponsiveContainer>
  );
}

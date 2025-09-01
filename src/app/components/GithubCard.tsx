"use client";
// import { error, time } from "console";
import { useEffect, useState } from "react";
//
// type hasil response API
//
export interface ContributionSummary {
  total: number;
  thisYear: number;
  thisMonth: number;
}

//
// type untuk component card
//
export interface GithubContributionCardProps {
  title: string;
  timeType: keyof ContributionSummary;
}

export default function GithubContributionCard({ title, timeType }: GithubContributionCardProps) {
  const [data, setData] = useState<ContributionSummary | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github/contributions");
        if (!res.ok) throw new Error("❌ Failed to fetch data");
        const json: ContributionSummary = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div className="border border-gray-300 rounded-xl p-3 text-center">Loading...</div>;
  }

  return (
    <div className="border border-gray-300 rounded-xl p-3">
      <div className="flex flex-col">
        <span className="">{title}</span>
        <span className="text-end text-5xl font-bold">{data[timeType]}</span>
      </div>
    </div>
  );
}

"use client";

type StatProps = {
  title: string;
  amount: string | number;
  loading: boolean;
};

export default function StatsCardList({ title, amount, loading }: StatProps) {
  return (
    <div className="w-[30%] broder border-gray-200 lg:w-32 rounded-sm overflow-hidden border text-center">
      <div className={`bg-white px-3 py-2 text-3xl text-black ${loading ? "font-light text-sm" : "font-bold"}`}>
        {loading ? "Loading..." : amount}
      </div>
      <div className="bg-white py-2 text-sm text-black">{title}</div>
    </div>
  );
}

"use client";

type StatItem = {
  title: string;
  amount: number;
};

type StatsProps = {
  items: StatItem[];
};

export default function StatsCardList({ items }: StatsProps) {
  return (
    <div className="flex gap-4">
      {items.map((item, index) => (
        <StatsCard key={index} item={item} />
      ))}
    </div>
  );
}

function StatsCard({ item }: { item: StatItem }) {
  return (
    <div className="w-32 rounded-lg overflow-hidden border text-center">
      <div className="bg-white py-4 text-3xl font-bold text-black">{item.amount}</div>
      <div className="bg-gray-300 py-2 text-sm text-black">{item.title}</div>
    </div>
  );
}

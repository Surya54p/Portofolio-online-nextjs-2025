export default function InformationCardSkeleton() {
  return (
    <div className="w-[300px] h-fit rounded-xl overflow-hidden border shadow bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="relative h-[200px] w-full bg-gray-300" />

      {/* Text Content Placeholder */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-2/3" />
        {/* Stack */}
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        {/* Summary (2 lines) */}
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        {/* Optional button placeholder */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}

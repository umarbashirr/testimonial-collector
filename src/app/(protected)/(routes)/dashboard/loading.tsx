export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></span>
      <span className="ml-4 text-lg text-gray-700">Loading dashboard...</span>
    </div>
  );
}

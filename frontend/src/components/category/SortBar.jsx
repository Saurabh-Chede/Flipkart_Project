export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="bg-white px-4 py-3 flex gap-6 text-sm border-b border-b-gray-200/70">
      <span className="font-semibold">Sort By</span>

      <button
        onClick={() => setSortBy("")}
        className={`cursor-pointer ${
          sortBy === "" ? "text-blue-600 font-semibold" : "text-gray-600"
        }`}
      >
        Popularity
      </button>

      <button
        onClick={() => setSortBy("lowToHigh")}
        className={`cursor-pointer ${
          sortBy === "lowToHigh"
            ? "text-blue-600 font-semibold"
            : "text-gray-600"
        }`}
      >
        Price ↑
      </button>

      <button
        onClick={() => setSortBy("highToLow")}
        className={`cursor-pointer ${
          sortBy === "highToLow"
            ? "text-blue-600 font-semibold"
            : "text-gray-600"
        }`}
      >
        Price ↓
      </button>
    </div>
  );
}

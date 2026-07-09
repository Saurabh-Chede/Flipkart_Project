export default function FilterSection({ priceFilter, setPriceFilter }) {
  return (
    <aside className="hidden md:block w-64 bg-white p-4 rounded-sm">
      <h4 className="text-base font-semibold mb-4">Filters</h4>

      <div className="mb-6">
        <p className="font-medium mb-2">Price</p>

        <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
          <input
            type="radio"
            name="price"
            checked={priceFilter === "under10k"}
            onChange={() => setPriceFilter("under10k")}
          />
          Under ₹10,000
        </label>

        <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
          <input
            type="radio"
            name="price"
            checked={priceFilter === "10kto20k"}
            onChange={() => setPriceFilter("10kto20k")}
          />
          ₹10,000 - ₹20,000
        </label>

        <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
          <input
            type="radio"
            name="price"
            checked={priceFilter === "above20k"}
            onChange={() => setPriceFilter("above20k")}
          />
          Above ₹20,000
        </label>

        <button
          onClick={() => setPriceFilter("")}
          className="text-blue-600 text-sm mt-2"
        >
          Clear Filter
        </button>
      </div>
    </aside>
  );
}

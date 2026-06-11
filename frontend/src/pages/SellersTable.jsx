import api from "@/config/axiosConfig";
import { useEffect, useState } from "react";

export default function SellersPage() {

  const [sellers,setSellers] = useState([])

  const fetchSellers = async()=>{

    try {
      const response = await api.get('/admin/all-sellers')
      console.log(response.data)

      if(response.data.success){
        setSellers(response.data.sellers)
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    fetchSellers()
  },[])

  // ---------------- Pagination State ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const sellersPerPage = 5; // rows per page

  const totalPages = Math.ceil(sellers.length / sellersPerPage);

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Sellers</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Store", "Email", "Status"].map((heading) => (
                <th key={heading} className="text-left px-4 py-3 text-gray-600 text-sm">{heading}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentSellers.map((seller) => (
              <tr key={seller._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-sm">{seller._id}</td>
                <td className="px-4 py-3 text-sm">{seller.name}</td>
                <td className="px-4 py-3 text-sm">{seller.store}</td>
                <td className="px-4 py-3 text-sm">{seller.email}</td>
                <td className={`px-4 py-3 text-sm font-medium ${
                  seller.status === "Active" ? "text-green-600" : "text-red-600"
                }`}>
                  {seller.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Pagination Controls ---------------- */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Search, Eye, Ban } from "lucide-react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", orders: 5, status: "Active", joined: "12 Jan 2024" },
    { id: 2, name: "Priya Singh", email: "priya@gmail.com", orders: 2, status: "Blocked", joined: "03 Feb 2024" },
    { id: 3, name: "Aman Verma", email: "aman@gmail.com", orders: 8, status: "Active", joined: "25 Mar 2024" },
    { id: 4, name: "Neha Patel", email: "neha@gmail.com", orders: 4, status: "Active", joined: "10 Apr 2024" },
    { id: 5, name: "Vikram Rao", email: "vikram@gmail.com", orders: 9, status: "Active", joined: "18 May 2024" },
    { id: 6, name: "Sneha Joshi", email: "sneha@gmail.com", orders: 3, status: "Blocked", joined: "01 Jun 2024" },
    { id: 7, name: "Rohit Das", email: "rohit@gmail.com", orders: 6, status: "Active", joined: "15 Jun 2024" },
    { id: 8, name: "Anjali Gupta", email: "anjali@gmail.com", orders: 7, status: "Active", joined: "20 Jul 2024" },
    { id: 9, name: "Sahil Khan", email: "sahil@gmail.com", orders: 1, status: "Active", joined: "02 Aug 2024" },
    { id: 10, name: "Karan Mehta", email: "karan@gmail.com", orders: 11, status: "Active", joined: "10 Sep 2024" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-xl font-bold text-gray-600">All Users</h1>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search user..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-t-gray-300 hover:bg-gray-50">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4 text-gray-500">{user.joined}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Ban size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
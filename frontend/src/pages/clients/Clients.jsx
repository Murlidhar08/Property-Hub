import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
const clientsData = [
    { id: 1, name: "John Doe", contact: "9876543210", email: "john@example.com", address: "New York, USA", occupation: "Investor" },
    { id: 2, name: "Jane Smith", contact: "9876543211", email: "jane@example.com", address: "Los Angeles, USA", occupation: "Realtor" },
    { id: 3, name: "Alice Johnson", contact: "9876543212", email: "alice@example.com", address: "San Francisco, USA", occupation: "Engineer" }
];

export const Clients = () => {

    const [search, setSearch] = useState("");

    const filteredClients = clientsData.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.contact.includes(search)
    );
    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Clients List</h2>

                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Clients Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                            <tr>
                                <th className="py-2 px-4 border">#</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Contact</th>
                                <th className="py-2 px-4 border">Email</th>
                                <th className="py-2 px-4 border">Address</th>
                                <th className="py-2 px-4 border">Occupation</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client, index) => (
                                    <tr key={client.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <td className="py-2 px-4 border text-center">{index + 1}</td>
                                        <td className="py-2 px-4 border">{client.name}</td>
                                        <td className="py-2 px-4 border">{client.contact}</td>
                                        <td className="py-2 px-4 border">{client.email}</td>
                                        <td className="py-2 px-4 border">{client.address}</td>
                                        <td className="py-2 px-4 border">{client.occupation}</td>
                                        <td className="py-2 px-4 border flex justify-center space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <MdEdit size={20} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-500">No clients found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
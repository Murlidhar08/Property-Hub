import { useState } from "react";

const AddUpdateClient = ({ clientData = null, onSubmit }) => {
  const [client, setClient] = useState({
    name: clientData?.name || "",
    contact: clientData?.contact || "",
    email: clientData?.email || "",
    address: clientData?.address || "",
    occupation: clientData?.occupation || "",
  });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(client);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">
        {clientData ? "Update Client" : "Add New Client"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Contact No.</label>
          <input
            type="tel"
            name="contact"
            value={client.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={client.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={client.occupation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={() => setClient(clientData || {})}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {clientData ? "Update Client" : "Add Client"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateClient;

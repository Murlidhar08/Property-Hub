import { useState } from "react";
import { Save } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";
import OpenStreetMapComponent from "@/components/OpenStreetMapComponent";

export default function AddUpdateProperty() {
  const [property, setProperty] = useState({
    title: "",
    type: "Plot",
    address: "",
    price: "",
    measurementValue: "",
    measurementUnit: "Feet",
    description: "",
    mapLocation: "",
    comments: "",
    status: "Selling",
    propertyFor: "Sell", // Can be 'Sell' or 'Rent'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", property);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full flex flex-col">
      <h1 className="text-2xl font-bold">Add/Update Property</h1>
      <hr className="my-4" />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-md shadow"
      >
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={property.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option>Plot</option>
            <option>Agriculture</option>
            <option>Non-agriculture</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Measurement</label>
            <input
              type="number"
              name="measurementValue"
              value={property.measurementValue}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Unit</label>
            <select
              name="measurementUnit"
              value={property.measurementUnit}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option>Feet</option>
              <option>Acer</option>
              <option>Bigha</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <QuillEditor />
        </div>
        <div>
          <label className="block text-sm font-medium">Map Location</label>
          <OpenStreetMapComponent />
        </div>
        <div>
          <label className="block text-sm font-medium">Comments</label>
          <textarea
            name="comments"
            value={property.comments}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={property.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option>Selling</option>
            <option>Sold</option>
            <option>Not Selling</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Property For</label>
          <select
            name="propertyFor"
            value={property.propertyFor}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option>Sell</option>
            <option>Rent</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            <Save className="inline mr-2" /> Save Property
          </button>
        </div>
      </form>
    </div>
  );
}

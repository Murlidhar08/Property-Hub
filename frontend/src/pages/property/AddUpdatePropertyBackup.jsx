import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Save, Upload, Trash } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";
import LeafletMap from "@/components/LeafletMap";

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
    propertyFor: "Sell",
  });

  const [images, setImages] = useState([]);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  // Remove uploaded image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", property);
    console.log("Uploaded Images:", images);
  };

  // React Dropzone Configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="p-6 bg-gray-100 max-h-screen w-full flex flex-col">
      <h1 className="text-2xl font-bold">Add Property</h1>
      <hr className="my-4" />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-md shadow"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Image Upload with react-dropzone */}
        <div>
          <label className="block text-sm font-medium">Property Images</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 cursor-pointer flex flex-col items-center justify-center hover:bg-gray-100"
          >
            <input {...getInputProps()} />
            <Upload className="w-6 h-6 text-gray-500 mb-2" />
            <span className="text-gray-500 text-sm">
              Drag & drop or click to upload images
            </span>
          </div>
        </div>

        {/* Display Uploaded Images */}
        {images.length > 0 && (
          <div className="mt-4 space-y-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <span className="text-sm truncate">{image.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={property.type}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option>Plot</option>
            <option>Agriculture</option>
            <option>Non-agriculture</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={property.address}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, price: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Measurement Details */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Measurement</label>
            <input
              type="number"
              name="measurementValue"
              value={property.measurementValue}
              onChange={(e) =>
                setProperty((prev) => ({
                  ...prev,
                  measurementValue: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Unit</label>
            <select
              name="measurementUnit"
              value={property.measurementUnit}
              onChange={(e) =>
                setProperty((prev) => ({
                  ...prev,
                  measurementUnit: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md"
            >
              <option>Feet</option>
              <option>Acre</option>
              <option>Bigha</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={property.status}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, status: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option>Selling</option>
            <option>Sold</option>
            <option>Not Selling</option>
          </select>
        </div>

        {/* Property For */}
        <div>
          <label className="block text-sm font-medium">Property For</label>
          <select
            name="propertyFor"
            value={property.propertyFor}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, propertyFor: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option>Sell</option>
            <option>Rent</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <QuillEditor />
        </div>

        {/* Map Location */}
        <div className="hidden">
          <label className="block text-sm font-medium">Map Location</label>
          <LeafletMap />
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium">Comments</label>
          <textarea
            name="comments"
            value={property.comments}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, comments: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
            Cancel
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            <Save className="inline mr-2" /> Save Property
          </button>
        </div>
      </form>
    </div>
  );
}

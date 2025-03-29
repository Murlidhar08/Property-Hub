import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import requirementService from "@/services/requirementService";
import clientService from "@/services/clientService";
import applicationService from "@/services/applicationService";

export default function AddUpdateRequirementPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get requirement ID if updating
  const isEditing = Boolean(id);
  const [clients, setClients] = useState([]);
  const [propertyFor, setPropertyFor] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [measurementType, setMeasurementType] = useState([]);
  const [priceType, setPriceType] = useState([]);
  const [requirementDetails, setRequirementDetails] = useState({
    title: "",
    location: "",
    minMeasurement: "",
    maxMeasurement: "",
    measurementUnitId: "",
    minPrice: "",
    maxPrice: "",
    priceUnit: "",
    requirementTypeId: "",
    clientId: "",
    description: "",
  });

  useEffect(() => {
    // Fetch clients for dropdown
    clientService.getAllClients()
      .then(data => setClients(data.clients))
      .catch(err => console.error(err));

    // Fetch property for options list
    applicationService.getPropertyFor()
      .then(res => setPropertyFor(res.data))
      .catch(err => console.error(err));

    // Fetch Property Type options list
    applicationService.getPropertyType()
      .then(res => setPropertyType(res.data))
      .catch(err => console.error(err));

    // Fetch Property Type options list
    applicationService.getMeasurementType()
      .then(res => setMeasurementType(res.data))
      .catch(err => console.error(err));

    // Fetch Price Type options list
    applicationService.getPriceType()
      .then(res => setPriceType(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch requirement details if editing
  useEffect(() => {
    if (!isEditing) return;
    requirementService.getRequirementById(id)
      .then(data => {
        setRequirementDetails(data.requirement);
      })
      .catch(err => {
        console.error(err);
      });
  }, [isEditing, id]);

  const handleChange = (e) => {
    setRequirementDetails({ ...requirementDetails, [e.target.name]: e.target.value });
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requirementDetails.title || !requirementDetails.location || !requirementDetails.measurementValue ||
      !requirementDetails.minPrice || !requirementDetails.maxPrice || !requirementDetails.requirementTypeId ||
      !requirementDetails.measurementUnitId || !requirementDetails.clientId || !requirementDetails.priceUnit) {
      toast.error("All fields except Description are required!");
      console.error("All fields except Description are required!");
      return;
    }

    try {
      if (isEditing) {
        await requirementService.updateRequirement(id, requirementDetails);
        toast.success("Requirement updated successfully!");
      } else {
        await requirementService.addRequirement(requirementDetails);
        toast.success("Requirement added successfully!");
      }
      navigate("/requirements");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleReset = () => {
    setRequirementDetails({
      title: "",
      description: "",
      location: "",
      minMeasurement: "",
      maxMeasurement: "",
      measurementUnitId: "",
      minPrice: "",
      maxPrice: "",
      priceUnit: "",
      requirementTypeId: "",
      clientId: "",
    });
  };

  return (
    <div className="px-6 pt-6 bg-white-100 min-h-screen w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div onClick={goBack} className="flex items-center text-blue-600 cursor-pointer hover:underline">
          <ArrowLeft size={20} className="mr-2" />
          {isEditing ? "Requirement details" : "Requirements List"}
        </div>
        <h2 className="text-xl font-bold text-center flex-grow mr-28">{isEditing ? "Update" : "Add"} Requirement</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input type="text" name="title" value={requirementDetails.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input type="text" name="location" value={requirementDetails.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
        </div>

        {/* Property For */}
        <div>
          <label className="block text-sm font-medium mb-1">Property For</label>
          <select name="propertyFor" value={requirementDetails.propertyFor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
            <option value="" disabled>Select Property For</option>
            {propertyFor.map(typeFor => (
              <option key={typeFor.id} value={typeFor.id}>{typeFor.name}</option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="requirementTypeId" value={requirementDetails.requirementTypeId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
            <option value="" disabled>Select Property Type</option>
            {propertyType.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        {/* Measurement */}
        <div>
          <label className="block text-sm font-medium mb-1">Measurement</label>
          <div className="flex space-x-2">
            <input type="number" name="minMeasurement" value={requirementDetails.minMeasurementValue} onChange={handleChange} placeholder="From" className="w-full px-3 py-2 border rounded-md text-sm" required />
            <input type="number" name="maxMeasurement" value={requirementDetails.maxMeasurementValue} onChange={handleChange} placeholder="Up to" className="w-full px-3 py-2 border rounded-md text-sm" required />
            <select name="measurementUnitId" value={requirementDetails.measurementUnitId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
              <option value="" disabled>Select Unit</option>
              {measurementType.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <div className="flex space-x-2">
            <input type="number" name="minPrice" value={requirementDetails.minPrice} onChange={handleChange} placeholder="Start from" className="w-full px-3 py-2 border rounded-md text-sm" required />
            <input type="number" name="maxPrice" value={requirementDetails.maxPrice} onChange={handleChange} placeholder="Up to" className="w-full px-3 py-2 border rounded-md text-sm" required />
            <select name="priceUnit" value={requirementDetails.priceUnit} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
              <option value="" disabled>Select Unit</option>
              {priceType.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Requirement by client */}
        <div>
          <label className="block text-sm font-medium mb-1">Requirement by Client</label>
          <select name="clientId" value={requirementDetails.clientId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
            <option value="" disabled>Select Client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description"
            value={requirementDetails.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none"
            required />
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 mt-auto bg-white py-4 w-full sticky bottom-0">
        <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm" onClick={handleReset}>Reset</button>
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">{isEditing ? "Update" : "Add"} Requirement</button>
      </div>
    </div>
  );
}

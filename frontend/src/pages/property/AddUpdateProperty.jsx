import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import propertyService from "@/services/propertyService";
import applicationService from "@/services/applicationService";
import ownerService from "@/services/ownerService";

export default function AddUpdatePropertyPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [measurementTypes, setMeasurementTypes] = useState([]);
    const [priceTypes, setPriceTypes] = useState([]);
    const [propertyStatus, setPropertyStatus] = useState([]);
    const [owners, setOwners] = useState([]);
    const [hasOwner, setHasOwner] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        propertyTypeId: "",
        address: "",
        pricePerUnit: "",
        priceTypeId: "",
        measurementValue: "",
        measurementTypeId: "",
        statusId: "",
        ownerId: "",
        description: ""
    });

    useEffect(() => {
        // Property types
        applicationService.getPropertyType()
            .then(res => setPropertyTypes(res.data))
            .catch(err => console.error(err));

        // Fetch list of measurement types
        applicationService.getMeasurementType()
            .then(res => setMeasurementTypes(res.data))
            .catch(err => console.error(err));

        // Fetch Price Type options list
        applicationService.getPriceType()
            .then(res => setPriceTypes(res.data))
            .catch(err => console.error(err));

        // Fetch property for options list
        applicationService.getPropertyStatus()
            .then(res => setPropertyStatus(res.data))
            .catch(err => console.error(err));

        // Fetch list of owners
        ownerService.getAllOwners()
            .then(res => {
                return setOwners(res.owners)
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!isEditing) return;
        propertyService.getPropertyById(id)
            .then(res => {
                setPropertyDetails(res.property);

                if (res.property.ownerId)
                    setHasOwner(true);
            })
            .catch(err => {
                console.error(err);
            });
    }, [isEditing, id]);

    const handleChange = (e) => {
        setPropertyDetails({ ...propertyDetails, [e.target.name]: e.target.value });
    };

    const goBack = () => {
        navigate(-1);
    };

    const handleReset = () => {
        setPropertyDetails({
            title: "",
            propertyTypeId: "",
            address: "",
            pricePerUnit: "",
            priceTypeId: "",
            measurementValue: "",
            measurementTypeId: "",
            statusId: "",
            ownerId: "",
            description: ""
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!propertyDetails.title || !propertyDetails.address || !propertyDetails.measurementValue ||
            !propertyDetails.measurementTypeId || !propertyDetails.propertyTypeId || !propertyDetails.pricePerUnit ||
            !propertyDetails.priceTypeId || !propertyDetails.statusId || !propertyDetails.description) {
            toast.error("All fields are required!");
            return;
        }


        try {
            if (isEditing) {
                await propertyService.updateProperty(id, propertyDetails);
                toast.success("Property updated successfully!");
            } else {
                await propertyService.addProperty(propertyDetails);
                toast.success("Property added successfully!");
            }
            navigate("/properties");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="px-6 pt-6 bg-white-100 min-h-screen w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div onClick={goBack} className="flex items-center text-blue-600 cursor-pointer hover:underline">
                    <ArrowLeft size={20} className="mr-2" />
                    {isEditing ? "Property Details" : "Property List"}
                </div>
                <h2 className="text-xl font-bold text-center flex-grow mr-28">{isEditing ? "Update" : "Add"} Property</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input type="text" name="title" value={propertyDetails.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
                </div>

                {/* Property Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select name="propertyTypeId" value={propertyDetails.propertyTypeId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
                        <option value="" disabled>Select Property Type</option>
                        {propertyTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                {/* Property Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">Property Status</label>
                    <select name="statusId" value={propertyDetails.statusId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
                        <option value="" disabled>Select Property Status</option>
                        {propertyStatus.map(typeFor => (
                            <option key={typeFor.id} value={typeFor.id}>{typeFor.name}</option>
                        ))}
                    </select>
                </div>

                {/* Measurement */}
                <div>
                    <label className="block text-sm font-medium mb-1">Measurement</label>
                    <div className="flex space-x-2">
                        <input type="number" name="measurementValue" value={propertyDetails.measurementValue} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
                        <select name="measurementTypeId" value={propertyDetails.measurementTypeId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
                            <option value="" disabled>Select Unit</option>
                            {measurementTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                </div>


                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input type="text" name="address" value={propertyDetails.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <div className="flex space-x-2">
                        <input type="number" name="pricePerUnit" value={propertyDetails.pricePerUnit} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required />
                        <select name="priceTypeId" value={propertyDetails.priceTypeId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
                            <option value="" disabled>Select Price Type</option>
                            {priceTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Has Owner */}
                <div>
                    <label className="block text-sm font-medium mb-1">Has Owner</label>
                    <input type="checkbox" checked={hasOwner} onChange={() => setHasOwner(!hasOwner)} />
                </div>
                {hasOwner && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Owner</label>
                        <select name="ownerId" value={propertyDetails.ownerId} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm" required>
                            <option value="" disabled>Select Owner</option>
                            {owners?.map(owner => (
                                <option key={owner.id} value={owner.id}>{owner.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea name="description" value={propertyDetails.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md text-sm h-24 resize-none" required />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-2 pt-4 mt-auto bg-white py-4 w-full sticky bottom-0">
                    <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm" onClick={handleReset}>Reset</button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm">{isEditing ? "Update" : "Add"} Property</button>
                </div>
            </form>
        </div>
    );
}
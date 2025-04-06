import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

// Components
import ImageCarousel from "@/components/ImageCarousel";

// Services
import propertyService from "@/services/propertyService";
import LeafletMap from '@/components/LeafletMap';

export default function PropertyDisplayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    propertyService.getPropertyById(id)
      .then((data) => {
        if (data.success) {
          setProperty(data.property);
        } else {
          throw new Error(data.message || "Failed to fetch property details.");
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await propertyService.deleteProperty(id);
      toast.success("Property deleted successfully!");
      navigate("/properties");
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col">
      <div className="bg-white px-6 pt-6 w-full h-full flex flex-col flex-grow">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <Link to="/properties" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft size={20} className="mr-2" /> Properties List
          </Link>
        </div>

        <div className="flex items-center border-t border-b py-4 space-x-4">
          <div>
            <h3 className="text-2xl font-semibold">{property?.title}</h3>
            <p className="text-gray-500">{property?.propertyType}</p>
          </div>
        </div>

        {/* images */}
        <div className="p-8">
          <ImageCarousel images={property?.images?.split(',')} />
        </div>

        {/* Property Details */}
        <div className="mt-6 space-y-4 flex-grow">
          {/* Address */}
          <div>
            <h4 className="font-semibold">Address</h4>
            <p className="text-gray-700">{property?.address}</p>
          </div>

          {/* Price */}
          <div>
            <h4 className="font-semibold">Price</h4>
            <p className="text-gray-700">
              {property?.pricePerUnit} {property?.priceType}/{property?.measurementType}
            </p>
          </div>

          {/* Measurement */}
          <div>
            <h4 className="font-semibold">Measurement</h4>
            <p className="text-gray-700">
              {property?.measurementValue} {property?.measurementType}
            </p>
          </div>

          {/* Total price calculation */}
          <div>
            <h4 className="font-semibold">Total Price</h4>
            <p className="text-gray-700">
              {property?.measurementValue * property?.pricePerUnit} {property?.priceType}
            </p>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-semibold">Status</h4>
            <p className="text-gray-700">{property?.status}</p>
          </div>

          {/* Owner */}
          {!!property?.ownerId && (
            <div>
              <h4 className="font-semibold">Owner</h4>
              <Link to={`/owners/${property?.ownerId}`}
                className="flex items-center text-blue-600 hover:underline">
                {property.ownerName}
              </Link>
            </div>
          )}

          {/* description */}
          {property?.description && (
            <div>
              <h4 className="font-semibold">Description</h4>
              <div className="text-gray-700 border p-2" dangerouslySetInnerHTML={{ __html: property.description }} />
            </div>
          )}

          {/* MAP */}
          <LeafletMap
            onLocationSelect={(coords) => {
              console.log("Clicked coordinates:", coords);
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-auto space-x-2 border-t pt-4 bg-white py-4 sticky bottom-0">
          <Link to={`/properties/edit/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center">
            <Pencil size={16} className="mr-2" /> Edit
          </Link>
          <button onClick={() => setOpenConfirm(true)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm flex items-center">
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this property? <br />This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

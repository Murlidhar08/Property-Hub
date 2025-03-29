import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import requirementService from "@/services/requirementService";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function RequirementDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requirement, setRequirement] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        requirementService.getRequirementById(id)
            .then((data) => {
                if (data.success) {
                    setRequirement(data.requirement);
                } else {
                    throw new Error(data.message || "Failed to fetch requirement details.");
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            await requirementService.deleteRequirement(id);
            toast.success("Requirement deleted successfully!");
            navigate("/requirements");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col">
            <div className="bg-white px-6 pt-6 w-full h-full flex flex-col flex-grow">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <Link to="/requirements" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft size={20} className="mr-2" /> Requirements List
                    </Link>
                </div>

                <div className="flex items-center border-t pt-4 space-x-4">
                    <div>
                        <h3 className="text-2xl font-semibold">{requirement?.title}</h3>
                        <p className="text-gray-500">{requirement?.requirementType}</p>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4 space-y-4 flex-grow">
                    <div>
                        <h4 className="font-semibold">Location</h4>
                        <p className="text-gray-700">{requirement?.location}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Measurement</h4>
                        <p className="text-gray-700">{requirement?.minMeasurement} - {requirement?.maxMeasurement} {requirement?.measurementType}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Price Range</h4>
                        <p className="text-gray-700">{requirement?.minPrice} - {requirement?.maxPrice} {requirement?.priceType}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Client Name</h4>
                        <p className="text-gray-700">{requirement?.clientName}</p>
                    </div>
                    {requirement?.description && (
                        <div>
                            <h4 className="font-semibold">Description</h4>
                            <p className="text-gray-700">{requirement.description}</p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-auto space-x-2 border-t pt-4 bg-white py-4 sticky bottom-0">
                    <Link to={`/requirements/edit/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center">
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
                    <DialogContentText>Are you sure you want to delete this requirement? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

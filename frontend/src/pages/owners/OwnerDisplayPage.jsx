import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import ownerService from "@/services/ownerService";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function OwnerDisplayPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [owner, setOwner] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        ownerService.getOwnerById(id)
            .then((data) => {
                if (data.success) {
                    setOwner(data.owner);
                } else {
                    throw new Error(data.message || "Failed to fetch owner details.");
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            await ownerService.deleteOwner(id);
            toast.success("Owner deleted successfully!");
            navigate("/owners");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col">
            <div className="bg-white px-6 pt-6 w-full h-full flex flex-col flex-grow">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <Link to="/owners" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft size={20} className="mr-2" /> Owners List
                    </Link>
                </div>

                <div className="flex items-center border-t pt-4 space-x-4">
                    <img
                        src={owner?.image || "/images/owner.png"}
                        alt={owner?.name}
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">{owner?.name}</h3>
                        <p className="text-gray-500">{owner?.address}</p>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4 space-y-4 flex-grow">
                    <div>
                        <h4 className="font-semibold">Phone Number</h4>
                        <a href={`tel:${owner?.contact}`} className="text-blue-600 underline">
                            {owner?.contact}
                        </a>
                    </div>
                    <div>
                        <h4 className="font-semibold">Email</h4>
                        <a className="text-blue-600 underline" href={`mailto:${owner?.email}`}>{owner?.email}</a>
                    </div>
                    <div>
                        <h4 className="font-semibold">Address</h4>
                        <p className="text-gray-700">{owner?.address}</p>
                    </div>
                    {owner?.description && (
                        <div>
                            <h4 className="font-semibold">Description</h4>
                            <p className="text-gray-700">{owner.description}</p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-auto space-x-2 border-t pt-4 bg-white py-4 sticky bottom-0">
                    <Link to={`/owners/edit/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center">
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
                    <DialogContentText>Are you sure you want to delete this owner? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
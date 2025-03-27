import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import agentService from "@/services/agentService";
import { toast } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function AgentDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        agentService.getAgentById(id)
            .then((data) => {
                if (data.success) {
                    setAgent(data.agent);
                } else {
                    throw new Error(data.message || "Failed to fetch agent details.");
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            await agentService.deleteAgent(id);
            toast.success("Agent deleted successfully!");
            navigate("/agents");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col">
            <div className="bg-white px-6 pt-6 w-full h-full flex flex-col flex-grow">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <Link to="/agents" className="flex items-center text-blue-600 hover:underline">
                        <ArrowLeft size={20} className="mr-2" /> Agents List
                    </Link>
                </div>

                <div className="flex items-center border-t pt-4 space-x-4">
                    <img
                        src={agent?.image || "/images/agent.png"}
                        alt={agent?.name}
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">{agent?.name}</h3>
                        <p className="text-gray-500">{agent?.area}</p>
                    </div>
                </div>

                <div className="mt-6 border-t pt-4 space-y-4 flex-grow">
                    <div>
                        <h4 className="font-semibold">Phone Number</h4>
                        <a href={`tel:${agent?.contact}`} className="text-blue-600 underline">
                            {agent?.contact}
                        </a>
                    </div>
                    <div>
                        <h4 className="font-semibold">Area</h4>
                        <p className="text-gray-700">{agent?.area}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Address</h4>
                        <p className="text-gray-700">{agent?.address}</p>
                    </div>
                    {agent?.description && (
                        <div>
                            <h4 className="font-semibold">Description</h4>
                            <p className="text-gray-700">{agent.description}</p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-auto space-x-2 border-t pt-4 bg-white py-4 sticky bottom-0">
                    <Link to={`/agents/edit/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center">
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
                    <DialogContentText>Are you sure you want to delete this agent? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import agentService from "@/services/agentService";

export default function AgentDisplayPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        agentService.getAgentById(id)
            .then(data => setAgent(data.agent))
            .catch(err => {
                toast.error("Failed to load agent details");
                console.error(err);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this agent?")) return;
        try {
            await agentService.deleteAgent(id);
            toast.success("Agent deleted successfully");
            navigate("/agents");
        } catch (err) {
            toast.error("Failed to delete agent");
        }
    };

    if (!agent) return <p className="text-center mt-10">Loading agent details...</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-center">Agent Details</h2>
                <div className="space-y-4">
                    <p><strong>Name:</strong> {agent.name}</p>
                    <p>
                        <strong>Contact:</strong>
                        <a href={`tel:${agent.contact}`} className="text-blue-600 underline ml-2">
                            {agent.contact}
                        </a>
                    </p>
                    <p><strong>Address:</strong> {agent.address}</p>
                    <p><strong>Area:</strong> {agent.area}</p>
                    {agent.image && <img src={agent.image} alt="Agent" className="w-full h-40 object-cover rounded-md" />}
                    {agent.description && <p><strong>Description:</strong> {agent.description}</p>}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                        onClick={() => navigate("/agents")}
                    >
                        Back
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        onClick={() => navigate(`/agents/edit/${id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

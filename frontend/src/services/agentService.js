import API from "./api";

const agentService = {
    getAllAgents: async () => {
        const response = await API.get("/agents");
        return response.data;
    },

    getAgentById: async (id) => {
        const response = await API.get(`/agents/${id}`);
        return response.data;
    },

    addAgent: async (agentData) => {
        const response = await API.post("/agents", agentData);
        return response.data;
    },

    updateAgent: async (id, agentData) => {
        const response = await API.put(`/agents/${id}`, agentData);
        return response.data;
    },

    deleteAgent: async (id) => {
        const response = await API.delete(`/agents/${id}`);
        return response.data;
    },
};

export default agentService;

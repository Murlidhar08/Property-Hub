import API from "./api";

const agentService = {
    getAllAgents: async () => {
        return await API.get("/agents");
    },

    getAgentById: async (id) => {
        return await API.get(`/agents/${id}`);
    },

    addAgent: async (agentData) => {
        return await API.post("/agents", agentData);
    },

    updateAgent: async (id, agentData) => {
        return await API.put(`/agents/${id}`, agentData);
    },

    deleteAgent: async (id) => {
        return await API.delete(`/agents/${id}`);
    },
};

export default agentService;

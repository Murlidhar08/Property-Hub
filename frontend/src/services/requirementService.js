import API from "./api";

const requirementService = {
    getAllRequirements: async () => {
        const response = await API.get("/requirements");
        return response.data;
    },

    getRequirementById: async (id) => {
        const response = await API.get(`/requirements/${id}`);
        return response.data;
    },

    addRequirement: async (requirementData) => {
        const response = await API.post("/requirements", requirementData);
        return response.data;
    },

    updateRequirement: async (id, requirementData) => {
        const response = await API.put(`/requirements/${id}`, requirementData);
        return response.data;
    },

    deleteRequirement: async (id) => {
        const response = await API.delete(`/requirements/${id}`);
        return response.data;
    },
};

export default requirementService;

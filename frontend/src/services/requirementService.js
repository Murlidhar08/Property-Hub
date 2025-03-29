import API from "./api";

const requirementService = {
    getAllRequirements: async () => {
        return await API.get("/requirements");
    },

    getRequirementById: async (id) => {
        return await API.get(`/requirements/${id}`);
    },

    addRequirement: async (requirementData) => {
        return await API.post("/requirements", requirementData);
    },

    updateRequirement: async (id, requirementData) => {
        return await API.put(`/requirements/${id}`, requirementData);
    },

    deleteRequirement: async (id) => {
        return await API.delete(`/requirements/${id}`);
    },
};

export default requirementService;

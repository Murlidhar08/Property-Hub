import API from "./api";

const ownerService = {
    getAllOwners: async () => {
        return await API.get("/owners");
    },

    getOwnerById: async (id) => {
        return await API.get(`/owners/${id}`);
    },

    addOwner: async (ownerData) => {
        return await API.post("/owners", ownerData);
    },

    updateOwner: async (id, ownerData) => {
        return await API.put(`/owners/${id}`, ownerData);
    },

    deleteOwner: async (id) => {
        return await API.delete(`/owners/${id}`);
    },
};

export default ownerService;

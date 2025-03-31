import API from "./api";

const propertyService = {
    getAllProperties: async () => {
        return await API.get("/properties");
    },

    getPropertyById: async (id) => {
        return await API.get(`/properties/${id}`);
    },

    addProperty: async (propertyData) => {
        return await API.post("/properties", propertyData);
    },

    updateProperty: async (id, propertyData) => {
        return await API.put(`/properties/${id}`, propertyData);
    },

    deleteProperty: async (id) => {
        return await API.delete(`/properties/${id}`);
    },
};

export default propertyService;

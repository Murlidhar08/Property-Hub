import API from "./api";

const propertyService = {
    getAllProperties: async () => {
        const response = await API.get("/properties");
        return response.data;
    },

    getPropertyById: async (id) => {
        const response = await API.get(`/properties/${id}`);
        return response.data;
    },

    addProperty: async (propertyData) => {
        const response = await API.post("/properties", propertyData);
        return response.data;
    },

    updateProperty: async (id, propertyData) => {
        const response = await API.put(`/properties/${id}`, propertyData);
        return response.data;
    },

    deleteProperty: async (id) => {
        const response = await API.delete(`/properties/${id}`);
        return response.data;
    },
};

export default propertyService;

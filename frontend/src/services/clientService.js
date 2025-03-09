import API from "./api";

const clientService = {
    getAllClients: async () => {
        const response = await API.get("/clients");
        return response.data;
    },

    getClientById: async (id) => {
        const response = await API.get(`/clients/${id}`);
        return response.data;
    },

    addClient: async (clientData) => {
        const response = await API.post("/clients", clientData);
        return response.data;
    },

    updateClient: async (id, clientData) => {
        const response = await API.put(`/clients/${id}`, clientData);
        return response.data;
    },

    deleteClient: async (id) => {
        const response = await API.delete(`/clients/${id}`);
        return response.data;
    },
};

export default clientService;

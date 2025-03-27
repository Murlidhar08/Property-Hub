import API from "./api";

const clientService = {
    getAllClients: async () => {
        return await API.get("/clients");
    },

    getClientById: async (id) => {
        return await API.get(`/clients/${id}`);
    },

    addClient: async (clientData) => {
        return await API.post("/clients", clientData);
    },

    updateClient: async (id, clientData) => {
        return await API.put(`/clients/${id}`, clientData);
    },

    deleteClient: async (id) => {
        return await API.delete(`/clients/${id}`);
    },
};

export default clientService;

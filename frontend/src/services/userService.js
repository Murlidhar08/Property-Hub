import API from "./api";

const userService = {
    getAllUsers: async () => {
        return await API.get("/users");
    },

    getUserById: async (id) => {
        return await API.get(`/users/${id}`);
    },

    updateUserRole: async (id, role) => {
        return await API.put(`/users/${id}/role`, { role });
    },

    deleteUser: async (id) => {
        return await API.delete(`/users/${id}`);
    },
};

export default userService;

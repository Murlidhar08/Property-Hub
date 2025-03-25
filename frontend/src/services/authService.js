import API from "./api";

const authService = {
    login: async ({ identifier, password }) => {
        return await API.post("/auth/login", { identifier, password });
    },

    register: async (data) => {
        return await API.post("/auth/register", data);
    },

    logout: async () => {
        localStorage.removeItem("token");
        return true;
    },

    getProfile: async () => {
        return await API.get("/auth/profile");
    },

    resetPassword: async (email) => {
        return await API.post("/auth/reset-password", { email });
    },

    googleAuth: async (code) => {
        return await API.get("/auth/google?code=" + code);
    },
};

export default authService;

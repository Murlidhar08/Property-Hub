import API from "./api";

const authService = {
    login: async ({ identifier, password }) => {
        return await API.post("/auth/login", { identifier, password });
    },

    register: async (data) => {
        return await API.post("/auth/register", data);
    },

    getProfile: async () => {
        return await API.get("/auth/profile");
    },

    googleLogin: async (code) => {
        return await API.post("/auth/googleLogin", { code });
    },

    logout: async () => {
        localStorage.removeItem("token");
        return true;
    },

    resetPassword: async (email) => {
        return await API.post("/auth/reset-password", { email });
    },
};

export default authService;

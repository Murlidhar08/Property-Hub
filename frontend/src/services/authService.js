import API from "./api";

const authService = {
    login: async (token) => {
        const response = await API.post("/auth/login", { token });
        return response.data;
    },

    logout: async () => {
        localStorage.removeItem("token");
        return true;
    },

    getProfile: async () => {
        const response = await API.get("/auth/profile");
        return response.data;
    },
};

export default authService;

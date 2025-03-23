import API from "./api";

const authService = {
    register: async ({ firstName, lastName, username, email, password, provider, providerId }) => {
        const response = await API.post("/auth/register", {
            firstName,
            lastName,
            username,
            email,
            password,
            provider,     // e.g., "local", "google", "facebook"
            providerId,   // Only applicable for OAuth providers
        });
        return response.data;
    },
    login: async ({ identifier, password }) => {
        const response = await API.post("/auth/login", { identifier, password });
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

    resetPassword: async (email) => {
        const response = await API.post("/auth/reset-password", { email });
        return response.data;
    },

    googleAuth: async (code) => {
        const response = await API.get("/auth/google?code=" + code);
        return response.data;
    },
};

export default authService;

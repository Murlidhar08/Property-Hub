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
        return await API.post("/auth/logout");
    },

    forgetPassword: async (email) => {
        return await API.post("/auth/forget-password", { email });
    },

    resetPassword: async (payload) => {
        return await API.post("/auth/reset-password", payload);
    },

    resendVerification: async () => {
        return await API.post("/auth/resend-verification");
    },

    verifyAccount: async (payload) => {
        return await API.post("/auth/verify-account", payload);
    },

    verifyToken: async (token) => {
        return await API.post("/auth/verify-token", { token });
    },
};

export default authService;

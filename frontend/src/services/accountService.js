import API from "./api";

const accountService = {
    updateUser: async (data) => {
        return await API.put("/account/user-info", data);
    },

    updateProfile: async (data) => {
        return await API.put("/account/profile-image", data);
    },
};

export default accountService;
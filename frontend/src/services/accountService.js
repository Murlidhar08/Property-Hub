import API from "./api";

const accountService = {
    updateUser: async () => {
        return await API.put("/account");
    },
};

export default accountService;
import API from "./api";

const clientService = {
    getDashboardCounts: async () => {
        return await API.get("/dashboard/counts");
    }
};

export default clientService;

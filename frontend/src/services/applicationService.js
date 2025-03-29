import API from "./api";

const applicationService = {
    getPropertyType: async () => {
        return await API.get("/application/property-type",);
    },
    getMeasurementType: async () => {
        return await API.get("/application/measurement-type",);
    },
    getPropertyStatus: async () => {
        return await API.get("/application/property-status",);
    },
    getPropertyFor: async () => {
        return await API.get("/application/property-for",);
    },
};

export default applicationService;

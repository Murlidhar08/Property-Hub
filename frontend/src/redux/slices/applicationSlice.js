import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propertyView: 'grid',
    requirementView: 'list',
    clientView: 'list',
    agentView: 'grid',
    ownerView: 'grid',
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setPropertyView: (state, action) => {
            state.propertyView = action.payload;
        },
        setRequirementView: (state, action) => {
            state.requirementView = action.payload;
        },
        setClientView: (state, action) => {
            state.clientView = action.payload;
        },
        setAgentView: (state, action) => {
            state.agentView = action.payload;
        },
        setOwnerView: (state, action) => {
            state.ownerView = action.payload;
        },
    },
});

export const {
    setPropertyView,
    setRequirementView,
    setClientView,
    setAgentView,
    setOwnerView
} = applicationSlice.actions;

export default applicationSlice.reducer;

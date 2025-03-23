import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: "",
    email: "",
    isAuthenticated: false,
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload, isAuthenticated: true };
        },
        setToken: (state, action) => {
            return { ...state, token: action.payload };
        },
        logout: () => {
            return { ...initialState };
        },
    },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;

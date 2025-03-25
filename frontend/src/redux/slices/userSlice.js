import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    roleId: 0,
    status: 0,
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
            localStorage.setItem("token", action.payload);
            return { ...state, token: action.payload };
        },
        logout: () => {
            localStorage.removeItem("token");
            return { ...initialState };
        },
    },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;

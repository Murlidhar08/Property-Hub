import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer
    },
});

export default store;

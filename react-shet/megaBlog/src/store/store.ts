import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uxSlice  from "./uxSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        ux : uxSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uxSlice from "./uxSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        ux: uxSlice,
        allUsersPosts: postSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UXState = {
    loading: boolean,
    theme : "dark" | "light",
    authChecked : boolean
};

const initialState: UXState = {
    loading: false,
    theme : "dark",
    authChecked : false
};

const uxSlice = createSlice({
    name: "ux",
    initialState: initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setTheme : (state,action : PayloadAction<UXState["theme"]>) => {
            state.theme = action.payload;
        },
        setAuthChecked : (state , action : PayloadAction<boolean>) => {
            state.authChecked = action.payload;
        }
    }
});

export const { setLoading , setTheme , setAuthChecked } = uxSlice.actions;

export default uxSlice.reducer;
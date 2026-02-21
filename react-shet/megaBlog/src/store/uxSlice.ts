import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UXState = {
    loading: boolean
};

const initialState: UXState = {
    loading: false
};

const uxSlice = createSlice({
    name: "ux",
    initialState: initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoading } = uxSlice.actions;

export default uxSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

type postArrayType = {
    names: string[],
    slugs: string[],
};

const initialState: postArrayType = {
    names: [],
    slugs: [],
};

const postSlice = createSlice({
    name: "allUserPosts",
    initialState: initialState,
    reducers: {
        setUserPosts: (state, action : {payload : postArrayType , type : any}) => {
            state.names = action.payload.names;
            state.slugs = action.payload.slugs;
        }
    }
});

export const { setUserPosts } = postSlice.actions;

export default postSlice.reducer;
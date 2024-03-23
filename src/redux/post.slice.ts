import { createSlice } from "@reduxjs/toolkit";

type PostState = {
    postID: string;
};

const initialState: PostState = {
    postID: "",
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getFeedFromID(state, action: { payload: string }) {
            state.postID = action.payload;
        },
    },
});


const postReducer = postSlice.reducer;   
export const { getFeedFromID } = postSlice.actions;
export default postReducer; 
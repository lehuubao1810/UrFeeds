import { createSlice } from "@reduxjs/toolkit";

type PostState = {
    postID: string;
    read: boolean;
};

const initialState: PostState = {
    postID: "",
    read: false,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getFeedFromID(state, action: { payload: string }) {
            state.postID = action.payload;
            state.read = true;
        },
    },
});


const postReducer = postSlice.reducer;   
export const { getFeedFromID } = postSlice.actions;
export default postReducer; 
import { createSlice } from "@reduxjs/toolkit";
import { Feed } from "../types/feeds.type";

type FeedsState = {
    feeds: Feed[];
    loading: boolean;
    error: boolean;
};

const initialState: FeedsState = {
    feeds: [],
    loading: false,
    error: false,
};

const feedsSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {

    },
});


const feedsReducer = feedsSlice.reducer;   
// export const { } = feedsSlice.actions;
export default feedsReducer; 
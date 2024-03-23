import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


type FeedsState = {
    feeds: NonNullable<unknown>[];
    status: "idle" | "loading" | "failed";
};

const initialState: FeedsState = {
    feeds: [],
    status: "idle",
};

export const fetchFeedsFromRSS = createAsyncThunk(
    "feeds/fetchFeedsFromRSS",
    async (rssURL: string) => {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssURL}`);
        const data = await response.json();
        return data;
    }
);


const feedsSlice = createSlice({
    name: "feeds",
    initialState,
    reducers: {},
    // re
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedsFromRSS.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFeedsFromRSS.fulfilled, (state, action) => {
                state.status = "idle";
                state.feeds = action.payload.items;
            });
    },
});

const feedsReducer = feedsSlice.reducer;

export default feedsReducer;
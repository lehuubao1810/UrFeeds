import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Post = {
  title: string;
  postID: string;
  link: string;
  description: string;
  pubDate: string;
};

export type Feed = {
  title: string;
  link: string;
  url: string;
  image: string;
  desc: string;
  post: Post[];
};

type FeedState = {
  feed: Feed;
  status: "idle" | "loading" | "failed" | "succeeded";
};

const initialState: FeedState = {
  feed: {} as Feed,
  status: "idle",
};

export const fetchFeedFromRSS = createAsyncThunk(
  "feeds/fetchFeedFromRSS",
  async (rssURL: string) => {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${rssURL}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
    return response;
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    resetFeed() {
      return initialState;
    }
  },
  // re
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedFromRSS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedFromRSS.fulfilled, (state, action) => {
        if (action.payload.status === "error") {
          state.status = "failed";
        } else {
          state.status = "succeeded";
          state.feed.title = action.payload.feed.title;
          state.feed.link = action.payload.feed.link;
          state.feed.url = action.payload.feed.url;
          state.feed.image = action.payload.feed.image;
          state.feed.desc = action.payload.feed.description;

          state.feed.post = action.payload.items;
        }
      })
      .addCase(fetchFeedFromRSS.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetFeed } = feedSlice.actions;

const feedReducer = feedSlice.reducer;

export default feedReducer;

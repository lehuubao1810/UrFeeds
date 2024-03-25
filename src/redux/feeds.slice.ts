import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Feed } from "./feed.slice";

import { db } from "../../firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

type FeedsState = {
  feeds: Feed[];
  status: "idle" | "loading" | "failed" | "succeeded";
};

const initialState: FeedsState = {
  feeds: [],
  status: "idle",
};

export const getFeedsFromFirestore = createAsyncThunk(
  "feeds/getFeedsFromFirestore",
  async (uid: string) => {
    const feedsDoc = await getDoc(doc(db, "feeds", uid))
      .then((doc) => doc.data())
      .catch((err) => err);
    return feedsDoc;
  }
);

export const addFeedsToFirestore = createAsyncThunk(
  "feeds/addFeedToFirestore",
  async (payload: { data: {feeds: Feed[]}; uid: string }) => {
    const feedDoc = await setDoc(doc(db, "feeds", payload.uid), payload.data)
      .then(() => payload.data)
      .catch((err) => err);
    return feedDoc;
  }
);

export const updateDocInFirestore = createAsyncThunk(
  "feeds/updateDocInFirestore",
  async (payload: { data: {feeds: Feed[]}; uid: string }) => {
    const feedDoc = await updateDoc(doc(db, "feeds", payload.uid), payload.data)
      .then(() => payload.data)
      .catch((err) => err);
    return feedDoc;
  }
);

const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    addFeed(state, action: { payload: Feed }) {
      state.feeds.push(action.payload);
    },
    removeFeed(state, action: { payload: Feed }) {
      // state.feeds = state.feeds.filter((feed) => feed !== action.payload);
      state.feeds = state.feeds.filter(
        (feed) => feed.link !== action.payload.link
      );
    },
    removeAllFeeds() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsFromFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFeedsFromFirestore.fulfilled, (state, action) => {
        state.feeds = action.payload.feeds;
        state.status = "succeeded";
      })
      .addCase(getFeedsFromFirestore.rejected, (state) => {
        state.status = "failed";
      })

      // Add Feed to Firestore
      .addCase(addFeedsToFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFeedsToFirestore.fulfilled, (state, action) => {
        state.feeds = action.payload.feeds;
        state.status = "succeeded";
      })
      .addCase(addFeedsToFirestore.rejected, (state) => {
        state.status = "failed";
      })

      // Update Feed in Firestore
      .addCase(updateDocInFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDocInFirestore.fulfilled, (state, action) => {
        state.feeds = action.payload.feeds;
        state.status = "succeeded";
      })
      .addCase(updateDocInFirestore.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addFeed, removeFeed, removeAllFeeds } = feedsSlice.actions;

const feedsReducer = feedsSlice.reducer;

export default feedsReducer;

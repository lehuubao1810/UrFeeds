import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../../firebase";

import { Post } from "./feed.slice";

type SavePostState = {
  posts: Post[];
  status: "idle" | "loading" | "failed" | "succeeded";
};

const initialState: SavePostState = {
  posts: [],
  status: "idle",
};

export const addPostToFirestore = createAsyncThunk(
  "savePost/addPostToFirestore",
  async (payload: { data: { posts: Post[] }; uid: string }) => {
    const feedDoc = await setDoc(
      doc(db, "savedPost", payload.uid),
      payload.data
    )
      .then(() => payload.data)
      .catch((err) => err);
    return feedDoc;
  }
);

export const updateSavePostInFirestore = createAsyncThunk(
  "savePost/updateSavePostInFirestore",
  async (payload: { data: { posts: Post[] }; uid: string }) => {
    const feedDoc = await updateDoc(
      doc(db, "savedPost", payload.uid),
      payload.data
    )
      .then(() => payload.data)
      .catch((err) => err);
    return feedDoc;
  }
);

export const getSavePostFromFirestore = createAsyncThunk(
  "savePost/getSavePostFromFirestore",
  async (uid: string) => {
    const feedsDoc = await getDoc(doc(db, "savedPost", uid))
      .then((doc) => doc.data())
      .catch((err) => err);
    return feedsDoc;
  }
);

const savePostSlice = createSlice({
  name: "savePost",
  initialState,
  reducers: {
    resetSavePost(state) {
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // addPostToFirestore
      .addCase(addPostToFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPostToFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(addPostToFirestore.rejected, (state) => {
        state.status = "failed";
      })

      // updateSavePostInFirestore
      .addCase(updateSavePostInFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSavePostInFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(updateSavePostInFirestore.rejected, (state) => {
        state.status = "failed";
      })

    // getSavePostFromFirestore
      .addCase(getSavePostFromFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSavePostFromFirestore.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.status = "succeeded";
      })
      .addCase(getSavePostFromFirestore.rejected, (state) => {
        state.status = "failed";
      });

  },
});

const savePostReducer = savePostSlice.reducer;
export const { resetSavePost } = savePostSlice.actions;
export default savePostReducer;

import { createSlice } from "@reduxjs/toolkit";

type SavePostState = {
  savePost: [
    {
      PostID: string;
      PostPubDate: string;
      PostURL: string;
      PostDesc: string;
    }
  ];
};

const initialState: SavePostState = {
  savePost: [
    {
      PostID: "",
      PostPubDate: "",
      PostURL: "",
      PostDesc: "",
    },
  ],
};

const savePostSlice = createSlice({
  name: "savePost",
  initialState,
  reducers: {
    saveFeed(state, action: { payload: SavePostState["savePost"][0] }) {
      state.savePost.push(action.payload);
    },
  },
});

const savePostReducer = savePostSlice.reducer;
export const { saveFeed } = savePostSlice.actions;
export default savePostReducer;

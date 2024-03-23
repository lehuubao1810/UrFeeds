import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { PURGE } from "redux-persist";

import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

type User = {
  username: string;
  email: string;
};

type AuthState = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: {
    username: "",
    email: "",
  },
  isLoading: false,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { username: string; email: string; password: string }) => {
    const { email, password } = userData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      setDoc(doc(db, "users", userCredential.user.uid), {
        username: userData.username,
        email: userCredential.user.email,
      });
      return userCredential.user;
    });
    return userCredential;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string }) => {
    const { email, password } = userData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        // state.user.isAuthenticated = false;
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user.email = action.payload.email ?? "";
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user.email = action.payload.email ?? "";
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
    //   .addCase(PURGE, (state) => { // PURGE is an action dispatched by redux-persist to clear the store
    //     state.isAuthenticated = initialState.isAuthenticated;
    //   });
  },
});

export const { logoutUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;

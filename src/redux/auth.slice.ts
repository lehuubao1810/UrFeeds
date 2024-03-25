import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
// import { PURGE } from "redux-persist";

import { auth, db, ggProvider, gitProvider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

type User = {
  username: string;
  email: string;
  uid: string;
};

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};

const initialState: AuthState = {
  user: {
    username: "",
    email: "",
    uid: "",
  },
  status: "idle",
  isAuthenticated: false,
  error: null,
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
    return { ...userCredential, username: userData.username };
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
    console.log(userCredential);
    // get user from firestore by uid
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    const user = userDoc.data();
    console.log(user);
    return { ...userCredential.user, username: user?.username ?? "" };
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const signIn = await signInWithPopup(auth, ggProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log("token", token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // Add user to firestore
        setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
        });

        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, email, credential, errorMessage);

        return errorCode;
      });
    console.log("check here", signIn);
    return signIn;
  }
);

export const loginWithGithub = createAsyncThunk(
  "auth/loginWithGithub",
  async () => {
    const signIn = await signInWithPopup(auth, gitProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log("token", token);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        return user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, email, credential, errorMessage);
        return errorCode;
      });
    return signIn;
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
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user.email = action.payload.email ?? "";
        state.user.username = action.payload.username ?? "";
        state.user.uid = action.payload.uid ?? "";
        console.log(action.payload);
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = "Cannot register user! Please try again.";
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user.email = action.payload.email ?? "";
        state.user.username = action.payload.username ?? "";
        state.user.uid = action.payload.uid ?? "";
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = "Invalid email or password! Please try again.";
      });
    //   .addCase(PURGE, (state) => { // PURGE is an action dispatched by redux-persist to clear the store
    //     state.isAuthenticated = initialState.isAuthenticated;
    //   });

    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload === "auth/popup-closed-by-user") {
          state.error = action.payload.errorMessage;
          state.status = "failed";
        } else {
          state.isAuthenticated = true;
          state.user.email = action.payload.email;
          state.user.username = action.payload.displayName;
          state.user.uid = action.payload.uid;
          console.log("GG", action.payload);
          state.status = "succeeded";
        }
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = "Cannot login with Google! Please try again.";
      });

    // Login with Github
    builder
      .addCase(loginWithGithub.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginWithGithub.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload === "auth/popup-closed-by-user") {
          state.error = action.payload.errorMessage;
          state.status = "failed";
        } else {
          state.isAuthenticated = true;
          state.user.email = action.payload.email;
          state.user.username = action.payload.displayName;
          state.user.uid = action.payload.uid;
          console.log("GG", action.payload);
          state.status = "succeeded";
        }
      })
      .addCase(loginWithGithub.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = "Cannot login with Github! Please try again.";
      });
  },
});

export const { logoutUser } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;

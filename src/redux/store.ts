import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import postReducer from "./post.slice";
import feedsReducer from "./feeds.slice";
import authReducer from "./auth.slice";
import savePostReducer from "./savePost.slice";
import feedReducer from "./feed.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "feeds", "savePost"],
};

const rootReducer = combineReducers({
  post: postReducer,
  feeds: feedsReducer,
  auth: authReducer,
  savePost: savePostReducer,
  feed: feedReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp", "payload"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates", "payload"],
      },
    }),
});

export const persistor = persistStore(store);

export const clearPersistedState = () => {
  persistor.purge();
};

export type RootState = ReturnType<typeof store.getState>; // This is the type of the state in the store
export type AppDispatch = typeof store.dispatch; // This is the type of the dispatch function

import { configureStore } from "@reduxjs/toolkit";
import feedsReducer from "./feeds.slice";

const store = configureStore({
    reducer: {
        feed: feedsReducer,
    },
    });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
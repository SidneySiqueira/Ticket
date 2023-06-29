import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import apiReducer from "./apiSlice";
import isLoggerReducer from "./isLoggerSlice";
import eventsReducer from "./apiEventsSlice";
import cartReducer from "./eventsCart";

const store = configureStore({
  reducer: {
    api: apiReducer,
    isLogger: isLoggerReducer,
    events: eventsReducer,
    cart: cartReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;

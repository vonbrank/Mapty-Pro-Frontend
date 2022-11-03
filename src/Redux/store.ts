import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./NavigationSlice";
import LoginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    navigation: NavigationReducer,
    login: LoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

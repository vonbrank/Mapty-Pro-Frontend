import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./NavigationSlice";
import LoginReducer from "./LoginSlice";
import JourneyReducer from "./JourneySlice";
import ToastReducer from "./ToastSlice";

const store = configureStore({
  reducer: {
    navigation: NavigationReducer,
    login: LoginReducer,
    journey: JourneyReducer,
    toast: ToastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

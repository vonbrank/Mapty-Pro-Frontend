import { configureStore } from "@reduxjs/toolkit";
import NavigationReducer from "./NavigationSlice";
import LoginReducer from "./LoginSlice";
import JourneyReducer from "./JourneySlice";

const store = configureStore({
  reducer: {
    navigation: NavigationReducer,
    login: LoginReducer,
    journey: JourneyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

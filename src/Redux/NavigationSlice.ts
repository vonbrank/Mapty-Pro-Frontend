import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  linkInfoList: {
    label: string;
    path: string;
    active: boolean;
  }[];
  activeIndex: number;
}

const initialState: NavigationState = {
  linkInfoList: [
    {
      label: "navigation.home",
      path: "/",
      active: true,
    },
    {
      label: "navigation.discovery",
      path: "/discovery",
      active: false,
    },
    {
      label: "navigation.profile",
      path: "/profile",
      active: false,
    },
    {
      label: "navigation.about",
      path: "/about",
      active: false,
    },
  ],
  activeIndex: 0,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<{ index: number }>) => {
      state.linkInfoList = state.linkInfoList.map((item, index) => {
        if (index === action.payload.index) {
          item.active = true;
          state.activeIndex = index;
          window.scrollTo(0, 0);
        } else item.active = false;
        return item;
      });
    },
  },
});

export const { navigateTo } = navigationSlice.actions;

export default navigationSlice.reducer;

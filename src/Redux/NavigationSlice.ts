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
      label: "Home",
      path: "./",
      active: true,
    },
    {
      label: "Discovery",
      path: "./",
      active: false,
    },
    {
      label: "About",
      path: "./",
      active: false,
    },
  ],
  activeIndex: 1,
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
        } else item.active = false;
        return item;
      });
    },
  },
});

export const { navigateTo } = navigationSlice.actions;

export default navigationSlice.reducer;

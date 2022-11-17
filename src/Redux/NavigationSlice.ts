import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  linkInfoList: {
    label: string;
    path: string;
    active: boolean;
    visible: boolean;
  }[];
  activeIndex: number;
}

const initialState: NavigationState = {
  linkInfoList: [
    {
      label: "navigation.home",
      path: "/",
      active: true,
      visible: true,
    },
    {
      label: "navigation.discovery",
      path: "/discovery",
      active: false,
      visible: true,
    },
    {
      label: "navigation.profile",
      path: "/profile",
      active: false,
      visible: false,
    },
    {
      label: "navigation.about",
      path: "/about",
      active: false,
      visible: true,
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
    setTabVisible: (
      state,
      action: PayloadAction<{
        label: string;
        newValue: boolean;
      }>
    ) => {
      state.linkInfoList = state.linkInfoList.map((item) => {
        if (item.label === action.payload.label) {
          return {
            ...item,
            visible: action.payload.newValue,
          };
        }
        return item;
      });
    },
  },
});

export const { navigateTo, setTabVisible } = navigationSlice.actions;

export default navigationSlice.reducer;

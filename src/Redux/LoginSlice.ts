import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPageModeType {
  name: string;
  index: number;
}

interface LoginState {
  mode: LoginPageModeType;
  loginPageOpen: boolean;
}

const LoginPageModes: LoginPageModeType[] = ["login", "create-account"].map(
  (item, index) => ({ name: item, index: index })
);

const initialState: LoginState = {
  mode: LoginPageModes[0],
  loginPageOpen: false,
};

export const loginSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<number>) => {
      state.mode = LoginPageModes[action.payload];
    },
    openLoginPage: (state, action: PayloadAction<boolean>) => {
      state.loginPageOpen = action.payload;
    },
  },
});

export const { switchMode, openLoginPage } = loginSlice.actions;

export default loginSlice.reducer;

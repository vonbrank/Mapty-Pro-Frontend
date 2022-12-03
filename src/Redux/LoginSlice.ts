import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "../Utils/Axios";
import { AppDispatch } from "./store";
import { setTabVisible } from "./NavigationSlice";
import { showTemporaryToastText } from "./ToastSlice";

interface LoginPageModeType {
  name: string;
  index: number;
}

interface LoginState {
  loginPage: {
    mode: LoginPageModeType;
    loginPageOpen: boolean;
  };
  currentUser?: UserAuth;
}

interface UserBase {
  username: string;
  email: string;
}

interface UserAuth extends UserBase {
  password: string;
}

const LoginPageModes: LoginPageModeType[] = ["login", "create-account"].map(
  (item, index) => ({ name: item, index: index })
);

const initialState: LoginState = {
  loginPage: {
    mode: LoginPageModes[0],
    loginPageOpen: false,
  },
};

export const loginSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<number>) => {
      state.loginPage.mode = LoginPageModes[action.payload];
    },
    openLoginPage: (state, action: PayloadAction<boolean>) => {
      state.loginPage.loginPageOpen = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<UserAuth | undefined>) => {
      state.currentUser = action.payload;
    },
  },
});

export const login = (loginData: UserAuth) => {
  return async (dispath: AppDispatch) => {
    try {
      const axiosRes = await Axios.post("/login", {
        ...loginData,
      });
      const res: {
        code: Number;
        description: string;
        timestamp: string;
        data?: UserAuth;
      } = axiosRes.data;
      if (res?.code === 200) {
        dispath(setCurrentUser(res.data));
        dispath(openLoginPage(false));
        dispath(
          showTemporaryToastText({
            severity: "success",
            message: "Login successfully.",
          })
        );
      } else if (res?.code === 400) {
        dispath(
          showTemporaryToastText({
            severity: "error",
            message: res.description,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispath(
        showTemporaryToastText({
          severity: "error",
          message: `${error}`,
        })
      );
    }
  };
};

export const createAccount = (accountdata: {
  username: string;
  email: string;
  password: string;
}) => {
  return async (dispath: AppDispatch) => {
    const axiosRes = await Axios.post("/register", {
      ...accountdata,
    });
    const res: {
      code: Number;
      description: string;
      timestamp: string;
      data?: {
        id: Number;
        username: string;
        password: string;
        email: string;
      };
    } = axiosRes.data;
    if (res.code === 200) {
      dispath(switchMode(LoginPageModes[0].index));
    }
  };
};

export const { switchMode, openLoginPage, setCurrentUser } = loginSlice.actions;

export default loginSlice.reducer;

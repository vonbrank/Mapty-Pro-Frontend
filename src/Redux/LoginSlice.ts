import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "../Utils/Axios";
import { AppDispatch } from "./store";
import { setTabVisible } from "./NavigationSlice";
import { showTemporaryToastText } from "./ToastSlice";

interface LoginPageModeType {
  name: string;
  index: number;
}

export type LoginStage = "idle" | "logging" | "success" | "error";
export type RegisterStage = "idle" | "registering" | "success" | "error";

interface LoginState {
  loginPage: {
    mode: LoginPageModeType;
    loginPageOpen: boolean;
  };
  currentUser?: UserAuth;
  loginStage: LoginStage;
  registerStage: RegisterStage;
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
  loginStage: "idle",
  registerStage: "idle",
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
    setLoginStage: (state, action: PayloadAction<LoginStage>) => {
      state.loginStage = action.payload;
    },
    setRegisterStage: (state, action: PayloadAction<RegisterStage>) => {
      state.registerStage = action.payload;
    },
  },
});

export const login = (loginData: UserAuth) => {
  return async (dispath: AppDispatch) => {
    try {
      dispath(setLoginStage("logging"));
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
        dispath(setLoginStage("success"));
      } else if (res?.code === 400) {
        dispath(
          showTemporaryToastText({
            severity: "error",
            message: res.description,
          })
        );
        dispath(setLoginStage("error"));
      }
    } catch (error) {
      console.error(error);
      dispath(
        showTemporaryToastText({
          severity: "error",
          message: `${error}`,
        })
      );
      dispath(setLoginStage("error"));
    }
  };
};

export const createAccount = (accountdata: {
  username: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
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
        dispatch(switchMode(LoginPageModes[0].index));
        dispatch(
          showTemporaryToastText({
            severity: "success",
            message: "Register successfully.",
          })
        );
        dispatch(setRegisterStage("success"));
      } else {
        dispatch(
          showTemporaryToastText({
            severity: "error",
            message: res.description,
          })
        );
        dispatch(setRegisterStage("error"));
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
      dispatch(setRegisterStage("error"));
    }
  };
};

export const updateUserInfo = (
  accountdata: {
    username: string;
    password: string;
  },
  newUserInfo: {
    username: string;
    email: string;
  }
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const axiosRes = await Axios.post(
        "/auth/updateUserProfile",
        {
          newUsername: newUserInfo.username,
          newEmail: newUserInfo.email,
        },
        {
          headers: {
            username: accountdata.username,
            password: accountdata.password,
          },
        }
      );
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
      if (res.code === 200 && res.data !== undefined) {
        dispatch(setCurrentUser(res.data));
        dispatch(
          showTemporaryToastText({
            severity: "success",
            message: "Update user info successfully.",
          })
        );
      } else {
        dispatch(
          showTemporaryToastText({
            severity: "error",
            message: res.description,
          })
        );
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
    }
  };
};

export const resetPassword = (
  accountdata: {
    username: string;
    password: string;
  },
  dataToPost: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const axiosRes = await Axios.post("/auth/resetPassword", dataToPost, {
        headers: {
          username: accountdata.username,
          password: accountdata.password,
        },
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
      if (res.code === 200 && res.data !== undefined) {
        dispatch(setCurrentUser(res.data));
        dispatch(
          showTemporaryToastText({
            severity: "success",
            message: "Reset password successfully.",
          })
        );
      } else {
        dispatch(
          showTemporaryToastText({
            severity: "error",
            message: res.description,
          })
        );
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
    }
  };
};

export const {
  switchMode,
  openLoginPage,
  setCurrentUser,
  setLoginStage,
  setRegisterStage,
} = loginSlice.actions;

export default loginSlice.reducer;

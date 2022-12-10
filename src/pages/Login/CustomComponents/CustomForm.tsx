import {
  Stack,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  MaptyProButton,
  MaptyProLoadingButton,
} from "../../../components/CommonButton";
import { MaptyProTextField } from "../../../components/CommonTextField";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  login,
  createAccount,
  setLoginStage,
  setRegisterStage,
} from "../../../Redux/LoginSlice";
import { RegisterNoticeModal } from "./CustomModal";
import { LoginTextField } from "./CustomTextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { showTemporaryToastText } from "../../../Redux/ToastSlice";

const LoginForm = () => {
  const [fullNameOrEmail, setFullNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { loginStage } = useAppSelector((state) => ({
    loginStage: state.login.loginStage,
  }));
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    dispatch(
      login({
        username: fullNameOrEmail,
        email: fullNameOrEmail,
        password: password,
      })
    );
  };

  useEffect(() => {
    // console.log("[Login Form] login stage = ", loginStage);
    setLoginButtonLoading(loginStage === "logging");
    if (loginStage === "success") {
      dispatch(setLoginStage("idle"));
      setFullNameOrEmail("");
      setPassword("");
    }
  }, [loginStage]);

  return (
    <Box paddingX={"0.8rem"}>
      <form method="" action="" onSubmit={handleLogin}>
        <Stack spacing="6.4rem">
          <LoginTextField
            variant="standard"
            label="Full Name or Email"
            value={fullNameOrEmail}
            onChange={(e) => setFullNameOrEmail(e.target.value)}
          />
          <LoginTextField
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <MaptyProLoadingButton
            sx={{ "&.MuiButtonBase-root": { marginTop: "6.4rem" } }}
            loading={loginButtonLoading}
            type="submit"
            variant="contained"
          >
            Login
          </MaptyProLoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

const CreateAccountForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [agreeNoticeChecked, setAgreeNoticeChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createAccountButtonLoading, setCreateAccountButtonLoading] =
    useState(false);
  const dispatch = useAppDispatch();
  const { registerStage } = useAppSelector((state) => ({
    registerStage: state.login.registerStage,
  }));

  const checkValueValidation: () => boolean = () => {
    const fullNameRegex = /^(\w|\-)+$/;
    const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!fullNameRegex.test(fullName)) {
      dispatch(
        showTemporaryToastText({
          severity: "warning",
          message: "仅支持包含字母、数字、下划线、横杠的非空字符串作为用户名",
        })
      );
      return false;
    }
    if (email !== "" && !emailRegex.test(email)) {
      dispatch(
        showTemporaryToastText({
          severity: "warning",
          message: "Email 格式不合法",
        })
      );
      return false;
    }
    if (!agreeNoticeChecked) {
      dispatch(
        showTemporaryToastText({
          severity: "warning",
          message: "请阅读【注意事项】并选择【Accept】",
        })
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();

    const valueValidation = checkValueValidation();
    if (!valueValidation) return;

    dispatch(setRegisterStage("registering"));
    await dispatch(
      createAccount({ username: fullName, email: email, password: password })
    );
  };

  const handleClickShowPassword = () => {
    setShowPassword((current) => !current);
  };

  useEffect(() => {
    setCreateAccountButtonLoading(registerStage === "registering");

    if (registerStage === "success") {
      dispatch(setRegisterStage("idle"));
      setFullName("");
      setEmail("");
      setPassword("");
      setAgreeNoticeChecked(false);
    }
  }, [registerStage]);

  return (
    <Box paddingX={"0.8rem"}>
      <form method="" action="" onSubmit={handleSubmit} autoComplete="off">
        <Stack spacing="4.8rem">
          <LoginTextField
            variant="standard"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="off"
            required
          />
          <LoginTextField
            variant="standard"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <LoginTextField
            type={showPassword ? "text" : "password"}
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          <FormControlLabel
            label="已阅读注意事项"
            control={
              <Checkbox
                checked={agreeNoticeChecked}
                sx={{ "&.MuiCheckbox-root": { padding: 0 } }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setNoticeModalOpen(true);
                  } else {
                    setAgreeNoticeChecked(false);
                  }
                }}
              />
            }
            sx={{
              "& .MuiTypography-root": {
                marginLeft: "1.2rem",
              },
            }}
          />
          <MaptyProLoadingButton
            sx={{ "&.MuiButtonBase-root": { marginTop: "6.4rem" } }}
            type="submit"
            variant="contained"
            loading={createAccountButtonLoading}
          >
            Create Account
          </MaptyProLoadingButton>
        </Stack>
      </form>
      <RegisterNoticeModal
        open={noticeModalOpen}
        handleClose={() => setNoticeModalOpen(false)}
        handleAccept={() => setAgreeNoticeChecked(true)}
      />
    </Box>
  );
};

export { LoginForm, CreateAccountForm };

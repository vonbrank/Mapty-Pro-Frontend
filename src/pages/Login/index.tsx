import {
  Box,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { validateHeaderValue } from "http";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import MaptyIcon from "../../assets/mapty-icon.png";
import { CreateAccountForm, LoginForm } from "./CustomComponents/CustomForm";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { openLoginPage, switchMode } from "../../Redux/LoginSlice";

const Login = () => {
  const loginTabProps = (index: number) => {
    return {
      id: `login-tab-${index}`,
      "aria-controls": `login-tabpanel-${index}`,
    };
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loginPageOpen, loginPageMode } = useAppSelector((state) => ({
    loginPageOpen: state.login.loginPageOpen,
    loginPageMode: state.login.mode,
  }));

  const handleLoginPageClose = () => {
    dispatch(openLoginPage(false));
  };

  const tabsContent = [<LoginForm />, <CreateAccountForm />];

  const minWidth768 = useMediaQuery("(min-width:768px)");

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1500,
        width: "100%",
        height: "100vh",
        overflowY: "overlay",
        transition: "all 0.5s",
        transform: `translateX(${loginPageOpen ? 0 : "100vw"})`,
      }}
    >
      <Box
        sx={{
          position: "relative",
          "& .Login-Page": {
            "&__tab": {
              fontSize: "2.4rem",
              fontWeight: 600,
              color: "#000",
              textTransform: "capitalize",
            },
            "&__form-container": {
              minHeight: "100vh",
              paddingY: "12.8rem",
              // paddingLeft: "12.8rem",
              paddingX: "12.8rem",
              width: minWidth768 ? "60vw" : "100vw",
              transform: minWidth768 ? "translateX(40vw)" : "",
              backgroundColor: "#fff",
              borderRadius: minWidth768 ? "2.4rem 0 0 2.4rem" : 0,
              boxShadow: "-4px 0px 4px rgba(0, 0, 0, 0.25)",
            },
            "&__form-box": {
              width: "72rem",
            },
            "&__close-button": {
              position: "absolute",
              top: "2.4rem",
              right: "2.4rem",
            },
            "&__background-image": {
              zIndex: -1,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "45vw",
              objectFit: "cover",
              background:
                "linear-gradient(to top, rgba(175, 216, 218, 0.2), rgba(175, 216, 218, 0.2)), url(https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/login-unsplash.webp) no-repeat center",
              backgroundSize: "cover",
            },
            "&__logo": {
              transform: "translate(-2.5vw)",
              "&-icon": {
                height: "9.6rem",
                width: "9.6rem",
              },
              "&-text": {
                fontSize: "6.4rem",
                color: "#fff",
                fontWeight: 600,
              },
            },
          },
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          className="Login-Page__background-image"
        >
          <Stack className="Login-Page__logo" alignItems="center">
            <img
              className="Login-Page__logo-icon"
              src={MaptyIcon}
              alt="mapty-icon"
            />
            <Typography className="Login-Page__logo-text">Mapty Pro</Typography>
          </Stack>
        </Stack>
        <Stack className="Login-Page__form-container" direction="row">
          <Box className="Login-Page__form-box">
            <Tabs className="Login-Page__tabs" value={loginPageMode.index}>
              <Tab
                className="Login-Page__tab"
                label="Login"
                {...loginTabProps(0)}
                onClick={() => dispatch(switchMode(0))}
              />
              <Tab
                className="Login-Page__tab"
                label="Create Account"
                {...loginTabProps(1)}
                onClick={() => dispatch(switchMode(1))}
              />
            </Tabs>
            {tabsContent[loginPageMode.index]}
          </Box>
        </Stack>
        <IconButton
          className="Login-Page__close-button"
          onClick={handleLoginPageClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Login;

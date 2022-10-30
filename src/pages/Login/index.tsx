import {
  Box,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { validateHeaderValue } from "http";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import MaptyIcon from "../../assets/mapty-icon.png";

const Login = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loginTabProps = (index: number) => {
    return {
      id: `login-tab-${index}`,
      "aria-controls": `login-tabpanel-${index}`,
    };
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        "& .Login-Page": {
          "&__tab": {
            fontSize: "2.4rem",
            fontWeight: 600,
            color: "#000",
            textTransform: "capitalize",
          },
          "&__form-container": {
            minHeight: "100vh",
            paddingTop: "12.8rem",
            paddingLeft: "12.8rem",
            transform: "translateX(40vw)",
            backgroundColor: "#fff",
            borderRadius: "2.4rem 0 0 2.4rem",
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
          <Tabs
            className="Login-Page__tabs"
            value={value}
            onChange={handleChange}
          >
            <Tab
              className="Login-Page__tab"
              label="Login"
              {...loginTabProps(0)}
            />
            <Tab
              className="Login-Page__tab"
              label="Create Account"
              {...loginTabProps(1)}
            />
          </Tabs>
        </Box>
      </Stack>
      <IconButton
        className="Login-Page__close-button"
        onClick={() => navigate("../")}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default Login;

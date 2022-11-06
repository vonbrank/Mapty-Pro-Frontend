import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MaptyIcon from "../../assets/mapty-icon.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MaptyProButton } from "../CommonButton";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { navigateTo } from "../../Redux/NavigationSlice";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { openLoginPage, switchMode } from "../../Redux/LoginSlice";
import { grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";

const NavigationHeader = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { linkInfoList, activeIndex, loginPageOpen } = useAppSelector(
    (state) => ({
      linkInfoList: state.navigation.linkInfoList,
      activeIndex: state.navigation.activeIndex,
      loginPageOpen: state.login.loginPageOpen,
    })
  );

  const navigate = useNavigate();

  const navigationTabProps = (index: number) => {
    return {
      id: `navigation-tab-${index}`,
      "aria-controls": `navigation-tabpanel-${index}`,
    };
  };

  const location = useLocation();

  useEffect(() => {
    linkInfoList.forEach((linkInfo, index) => {
      if (location.pathname.startsWith(linkInfo.path)) {
        dispatch(navigateTo({ index: index }));
      }
    });
    setSideNavigationOpen(false);
  }, [location]);

  const [sideNavigationOpen, setSideNavigationOpen] = useState(false);
  const handleToggleSizeNavClick = () => {
    setSideNavigationOpen((current) => !current);
  };

  const minWidth900 = useMediaQuery("(min-width:900px)");

  return (
    <>
      <Paper sx={{ zIndex: 1300, position: "relative" }}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: "8rem",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing="1.2rem"
              sx={{
                "& .navigator-logo": {
                  "&__icon": {
                    height: "3.6rem",
                    width: "3.6rem",
                  },
                  "&__text": {
                    fontSize: "2.4rem",
                    fontWeight: "600",
                  },
                },
              }}
            >
              <img
                src={MaptyIcon}
                alt="Mapty Icon"
                className="navigator-logo__icon"
              />
              <Typography className="navigator-logo__text">
                Mapty Pro
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{
                display: minWidth900 ? "" : "none",
              }}
            >
              <Tabs
                value={activeIndex}
                aria-label="Mapty-Pro-Navigation"
                sx={{
                  "& .MuiTab-root": {
                    fontSize: "1.8rem",
                    textTransform: "capitalize",
                    padding: "1.2rem 2.4rem",
                  },
                }}
              >
                {linkInfoList.map((linkInfo, index) => (
                  <Tab
                    label={linkInfo.label}
                    key={linkInfo.label}
                    {...navigationTabProps(index)}
                    onClick={(e) => {
                      navigate(linkInfo.path);
                    }}
                  />
                ))}
              </Tabs>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: minWidth900 ? "" : "none",
              }}
            >
              <MaptyProButton
                onClick={() => {
                  dispatch(openLoginPage(true));
                  dispatch(switchMode(0));
                }}
                variant="outlined"
              >
                Login
              </MaptyProButton>
              <MaptyProButton
                variant="contained"
                onClick={() => {
                  dispatch(openLoginPage(true));
                  dispatch(switchMode(1));
                }}
              >
                Sign up
              </MaptyProButton>
            </Stack>
            <IconButton
              onClick={handleToggleSizeNavClick}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "3rem" },
                display: !minWidth900 ? "" : "none",
              }}
            >
              <ListIcon
                sx={{ display: sideNavigationOpen ? "none" : "inline-block" }}
              />
              <CloseIcon
                sx={{ display: !sideNavigationOpen ? "none" : "inline-block" }}
              />
            </IconButton>
          </Stack>
        </Container>
      </Paper>
      <Stack
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0 , 0.5)",
          transform: sideNavigationOpen ? "" : "translateX(100vw)",
          transition: "all 0.5s",
          zIndex: 1299,
          display: !minWidth900 ? "" : "none",
          backdropFilter: "blur(10px)",
        }}
        alignItems="center"
        justifyContent={"center"}
      >
        <Tabs
          value={activeIndex}
          aria-label="Mapty-Pro-Navigation"
          orientation="vertical"
          sx={{
            "& .MuiTab-root": {
              fontSize: "3rem",
              textTransform: "capitalize",
              padding: "1.2rem 2.4rem",
              color: "#fff",
              fontWeight: 600,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          {linkInfoList.map((linkInfo, index) => (
            <Tab
              label={linkInfo.label}
              key={linkInfo.label}
              {...navigationTabProps(index)}
              onClick={(e) => {
                navigate(linkInfo.path);
              }}
            />
          ))}
        </Tabs>
        <Stack
          spacing={2}
          marginTop="1.6rem"
          sx={{
            "& .MuiButtonBase-root": {
              fontSize: "2.4rem",
              fontWeight: 600,
              "&.MuiButton-outlinedPrimary": {
                borderWidth: "2px",
              },
            },
          }}
        >
          <MaptyProButton
            size="large"
            onClick={() => {
              setSideNavigationOpen(false);
              dispatch(openLoginPage(true));
              dispatch(switchMode(0));
            }}
            variant="outlined"
          >
            Login
          </MaptyProButton>
          <MaptyProButton
            size="large"
            variant="contained"
            onClick={() => {
              setSideNavigationOpen(false);
              dispatch(openLoginPage(true));
              dispatch(switchMode(1));
            }}
          >
            Sign up
          </MaptyProButton>
        </Stack>
      </Stack>
    </>
  );
};

export default NavigationHeader;

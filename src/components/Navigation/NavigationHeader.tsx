import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import MaptyIcon from "../../assets/mapty-icon.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { MaptyProButton } from "../CommonButton";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { navigateTo } from "../../Redux/NavigationSlice";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

const NavigationHeader = () => {
  const dispatch = useAppDispatch();
  const { linkInfoList, activeIndex } = useAppSelector((state) => ({
    linkInfoList: state.navigation.linkInfoList,
    activeIndex: state.navigation.activeIndex,
  }));

  const navigate = useNavigate();

  const navigationTabProps = (index: number) => {
    return {
      id: `navigation-tab-${index}`,
      "aria-controls": `navigation-tabpanel-${index}`,
    };
  };

  const location = useLocation();

  console.log("[Navigation] hash", location.hash);
  console.log("[Navigation] pathname", location.pathname);
  console.log("[Navigation] search", location.search);

  useEffect(() => {
    linkInfoList.forEach((linkInfo, index) => {
      if (location.pathname.startsWith(linkInfo.path)) {
        dispatch(navigateTo({ index: index }));
      }
    });
  }, [location]);

  return (
    <Paper sx={{ zIndex: 1300 }}>
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
            <Typography className="navigator-logo__text">Mapty Pro</Typography>
          </Stack>
          <Stack direction="row">
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
          <Stack direction="row" spacing={2}>
            <MaptyProButton
              onClick={() => navigate("./login")}
              variant="outlined"
            >
              Login
            </MaptyProButton>
            <MaptyProButton variant="contained">Sign up</MaptyProButton>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export default NavigationHeader;

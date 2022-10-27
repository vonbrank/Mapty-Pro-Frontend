import React, { useState } from "react";
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

function a11yProps(index: number) {
  return {
    id: `navigation-tab-${index}`,
    "aria-controls": `navigation-tabpanel-${index}`,
  };
}

const NavigationHeader = () => {
  const dispatch = useAppDispatch();
  const { linkInfoList, activeIndex } = useAppSelector((state) => ({
    linkInfoList: state.navigation.linkInfoList,
    activeIndex: state.navigation.activeIndex,
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(navigateTo({ index: newValue }));
  };

  return (
    <Paper>
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
              onChange={handleChange}
              aria-label="basic tabs example"
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
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Stack>
          <Stack direction="row" spacing={2}>
            <MaptyProButton variant="outlined">Login</MaptyProButton>
            <MaptyProButton variant="contained">Sign up</MaptyProButton>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export default NavigationHeader;

import React, { useEffect, useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { LOCALES } from "../../../lang";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { grey } from "@mui/material/colors";
import { MaptyProButton } from "../../CommonButton";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { setCurrentUser } from "../../../Redux/LoginSlice";
import { useNavigate } from "react-router-dom";

export const LanguageSwitch = ({
  handleChangeLocale = () => {},
}: {
  handleChangeLocale?: (newLocale: string) => void;
}) => {
  const [langListAnchorEl, setLangListAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleLangListClose = () => {
    setLangListAnchorEl(null);
  };

  const handleLangButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLangListAnchorEl(event.currentTarget);
  };

  const handleChangeLocaleItemClick = (newLocale: string) => {
    handleChangeLocale(newLocale);
    handleLangListClose();
  }

  return (
    <>
      <IconButton onClick={handleLangButtonClick}>
        <LanguageIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Popover
        open={Boolean(langListAnchorEl)}
        id={
          Boolean(langListAnchorEl) ? "Navigation-lang-list-popover" : undefined
        }
        anchorEl={langListAnchorEl}
        onClose={handleLangListClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleChangeLocaleItemClick(LOCALES.CHINESE)}>
              <ListItemText primary="中文" sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleChangeLocaleItemClick(LOCALES.ENGLISH)}>
              <ListItemText primary="English" sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export const ProfileDetail = () => {
  const [profilePanelAnchorEl, setProfilePanelAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleProfilePanelClose = () => {
    setProfilePanelAnchorEl(null);
  };

  const handleProfilePanelButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setProfilePanelAnchorEl(event.currentTarget);
  };

  const { currentUser } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <IconButton onClick={handleProfilePanelButtonClick}>
        <AccountCircleIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
      <Popover
        open={Boolean(profilePanelAnchorEl)}
        id={
          Boolean(profilePanelAnchorEl)
            ? "Navigation-profile-panel-popover"
            : undefined
        }
        anchorEl={profilePanelAnchorEl}
        onClose={handleProfilePanelClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box padding="3.2rem">
          <Stack spacing={"1.8rem"}>
            <Stack
              direction={"row"}
              alignItems="center"
              spacing={"2.4rem"}
              minWidth="25.6rem"
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: "8rem" }} />
              <Stack>
                <Typography sx={{ fontSize: "1.8rem" }}>
                  {currentUser?.username}
                </Typography>
                <Typography sx={{ fontSize: "1.2rem", color: grey[700] }}>
                  {currentUser?.email
                    ? currentUser?.email
                    : "Want to bind your email addres? Click Here."}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <MaptyProButton
              fullWidth
              onClick={() => {
                navigate("/");
                dispatch(setCurrentUser(undefined));
              }}
            >
              Logout
            </MaptyProButton>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

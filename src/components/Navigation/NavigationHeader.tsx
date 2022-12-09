import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MaptyIcon from "../../assets/mapty-icon.png";
import { MaptyProButton } from "../CommonButton";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { navigateTo, setTabVisible } from "../../Redux/NavigationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { openLoginPage, switchMode } from "../../Redux/LoginSlice";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import { useIntl } from "react-intl";
import { CustomNavigationTab } from "./CustomComponents/CustomTab";
import { CustomLoginButtonGroup } from "./CustomComponents/CustomButtonGroup";
import { LanguageSwitch, ProfileDetail } from "./CustomComponents/CustomPanel";
import { grey } from "@mui/material/colors";

const NavigationHeader = ({
  handleChangeLocale = () => {},
}: {
  handleChangeLocale?: (newLocale: string) => void;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { linkInfoList, currentUser } = useAppSelector((state) => ({
    linkInfoList: state.navigation.linkInfoList,
    currentUser: state.login.currentUser,
  }));

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

  const intl = useIntl();
  const navigate = useNavigate();

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
            <MaptyProButton
              sx={{ padding: 0, color: grey[800] }}
              onClick={() => navigate("/")}
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
                  cursor: "pointer",
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
            </MaptyProButton>
            <Stack
              direction="row"
              sx={{
                display: minWidth900 ? "" : "none",
              }}
            >
              <CustomNavigationTab
                sx={{
                  "& .MuiTab-root": {
                    fontSize: "1.8rem",
                    textTransform: "capitalize",
                    padding: "1.2rem 2.4rem",
                  },
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <LanguageSwitch handleChangeLocale={handleChangeLocale} />
              {currentUser === undefined && (
                <CustomLoginButtonGroup
                  sx={{
                    display: minWidth900 ? "" : "none",
                  }}
                />
              )}
              {currentUser !== undefined && <ProfileDetail />}
              <IconButton
                onClick={handleToggleSizeNavClick}
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: "3rem" },
                  display: !minWidth900 ? "" : "none",
                }}
              >
                {!sideNavigationOpen && <ListIcon />}
                {sideNavigationOpen && <CloseIcon />}
              </IconButton>
            </Stack>
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
        <CustomNavigationTab
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
        />
        {currentUser === undefined && (
          <CustomLoginButtonGroup
            direction="column"
            sx={{
              marginTop: "1.6rem",
            }}
            onClick={() => {
              setSideNavigationOpen(false);
            }}
          />
        )}
      </Stack>
    </>
  );
};

export default NavigationHeader;

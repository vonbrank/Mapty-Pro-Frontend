import React, { useEffect } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { MapDiscovery } from "../../components/LeafletMap";
import JourneyEditor from "./JourneyEditor";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  getDataFromLocalStorage,
  getUserJourneyData,
} from "../../Redux/JourneySlice";

const DiscoveryPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, []);

  const minWidth768 = useMediaQuery("(min-width:768px)");

  const { currentUser } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
  }));

  useEffect(() => {
    if (currentUser == undefined) return;
    dispatch(
      getUserJourneyData({
        username: currentUser.username,
        password: "",
      })
    );
  }, [currentUser]);

  return (
    <Container
      className="Discovery-Page"
      sx={{
        "& .Discovery-Page": {},
        "& .leaflet-control-zoom.leaflet-bar.leaflet-control": {
          transform: minWidth768 ? "translateX(40rem)" : "",
        },
        "& .MuiAccordion-root": {
          backgroundColor: "rgb(67, 72, 77)",
          color: "#fff",
          "& .MuiTypography-root, & .MuiAccordionSummary-expandIconWrapper": {
            color: "#fff",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 500,
          height: "calc(100vh - 8rem)",
        }}
      >
        <MapDiscovery />
        <JourneyEditor />
      </Box>
    </Container>
  );
};

export default DiscoveryPage;

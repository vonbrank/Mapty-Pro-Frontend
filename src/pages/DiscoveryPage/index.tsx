import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { MapDiscovery } from "../../components/LeafletMap";
import JourneyEditor from "./JourneyEditor";
import { useAppDispatch } from "../../Redux/hooks";
import { getDataFromLocalStorage } from "../../Redux/JourneySlice";

const DiscoveryPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, []);

  return (
    <Container
      className="Discovery-Page"
      sx={{
        "& .Discovery-Page": {},
        "& .leaflet-control-zoom.leaflet-bar.leaflet-control": {
          transform: "translateX(40rem)",
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
        }}
      >
        <MapDiscovery />
        <JourneyEditor />
      </Box>
    </Container>
  );
};

export default DiscoveryPage;

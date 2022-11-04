import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { MapDiscovery } from "../../components/LeafletMap";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomAccordion } from "./CustomComponents/CustomAccordion";
import { MaptyProButton } from "../../components/CommonButton";
import { current } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import JourneyEditor from "./JourneyEditor";

const DiscoveryPage = () => {
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

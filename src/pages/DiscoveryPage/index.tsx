import React, { useRef, useEffect, useState } from "react";
import { Box, Container, Stack, styled } from "@mui/material";
import { MapDiscovery } from "../../components/LeafletMap";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomAccordion } from "./CustomComponents/CustomAccordion";

export interface JourneyData {
  title: string;
  description: string;
  waypointList: {
    label: string;
    time: string;
    coordinate?: {
      lat: number;
      lng: number;
    };
  }[];
}

const journeyDataList: JourneyData[] = [
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
  {
    title: "Harbin Institute of Technology surrounding",
    description: "what a nice place",
    waypointList: [
      {
        label: "ZhengXin building",
        time: "08:00",
      },
      {
        label: "ZhengXin building",
        time: "12:00",
      },
      {
        label: "ZhengXin building",
        time: "16:00",
      },
      {
        label: "ZhengXin building",
        time: "19:00",
      },
    ],
  },
];

const DiscoveryPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [journeyList, setJourneyList] = useState(
    journeyDataList.map((journeyData) => ({
      expanded: false,
    }))
  );

  const handleJourneyListAccordionChange = (
    event: React.SyntheticEvent,
    index: number
  ) => {
    setJourneyList(
      journeyList.map((journey, currentIndex) => {
        if (currentIndex == index) {
          return {
            expanded: !journey.expanded,
          };
        } else {
          return {
            expanded: false,
          };
        }
      })
    );
  };

  return (
    <Container
      className="Discovery-Page"
      sx={{
        "& .Discovery-Page": {
          "&__editor-root": {
            width: "36rem",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 501,
            backgroundColor: "rgb(46, 52, 57, 0.8)",
            backdropFilter: "blur(10px)",
            padding: "6.4rem 3.2rem",
            overflow: "overlay",
            borderRight: "1px solid rgba(0, 0, 0, 0.2)",
          },
        },
        "& .leaflet-control-zoom.leaflet-bar.leaflet-control": {
          transform: "translateX(36rem)",
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
        <Box className="Discovery-Page__editor-root">
          {journeyDataList.map((journeyData, index) => (
            <CustomAccordion
              onAccordionChange={handleJourneyListAccordionChange}
              expanded={journeyList[index].expanded}
              key={index}
              index={index}
              journeyData={journeyData}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default DiscoveryPage;

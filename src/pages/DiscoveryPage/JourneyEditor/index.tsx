import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomAccordion } from "../CustomComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import CreateJourneyPanel from "./CreateJourneyPanel";
import {
  JourneyData,
  setWaypoinsDisplayOnMap,
} from "../../../Redux/JourneySlice";

const JourneyEditor = () => {
  const dispatch = useAppDispatch();
  const { journeyDataList } = useAppSelector((state) => ({
    journeyDataList: state.journey.personnal.jourenyList,
  }));

  const [journeyAccordionList, setJourneyAccordionList] = useState(
    journeyDataList.map((journeyData) => ({
      expanded: false,
      ...journeyData,
    }))
  );

  useEffect(() => {
    setJourneyAccordionList(
      journeyDataList.map((journeyData) => ({
        ...journeyData,
        expanded: false,
      }))
    );
  }, [journeyDataList]);

  const [createJourneyOpen, setCreateJourneyOpen] = useState(false);
  const theme = useTheme();

  const handleJourneyListAccordionChange = (
    event: React.SyntheticEvent,
    index: number
  ) => {
    setCreateJourneyOpen(false);
    setJourneyAccordionList(
      journeyAccordionList.map((journey, currentIndex) => {
        if (currentIndex == index) {
          if (journey.expanded) {
            dispatch(setWaypoinsDisplayOnMap([]));
          } else {
            dispatch(setWaypoinsDisplayOnMap(journey.waypointList));
          }
          return {
            ...journey,
            expanded: !journey.expanded,
          };
        }
        return {
          ...journey,
          expanded: false,
        };
      })
    );
  };

  const handleCreateJourneyButtonClick = () => {
    if (createJourneyOpen) {
      setCreateJourneyOpen(false);
      dispatch(setWaypoinsDisplayOnMap([]));
    } else {
      setCreateJourneyOpen(true);
      setJourneyAccordionList(
        journeyAccordionList.map((journey) => {
          return {
            ...journey,
            expanded: false,
          };
        })
      );
    }
  };

  const handleCreateJourneySubmit = () => {
    setCreateJourneyOpen(false);
    dispatch(setWaypoinsDisplayOnMap([]));
  };

  return (
    <Box
      className="Discovery-Page__editor-root"
      sx={{
        width: "40rem",
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
        "& .MuiTypography-root": {
          color: "#fff",
        },
      }}
    >
      <CreateJourneyPanel
        createJourneyOpen={createJourneyOpen}
        onCreateJourneyButtonClick={handleCreateJourneyButtonClick}
        onCreateJourneySubmit={handleCreateJourneySubmit}
      />
      <Divider
        sx={{
          borderColor: "rgba(255, 255, 255, 0.5)",
          marginBottom: "1.2rem",
        }}
      />
      {journeyAccordionList.map((journey, index) => (
        <CustomAccordion
          onAccordionChange={handleJourneyListAccordionChange}
          expanded={journey.expanded}
          key={index}
          index={index}
          journeyData={journey}
        />
      ))}
    </Box>
  );
};

export default JourneyEditor;

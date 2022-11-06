import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomAccordion } from "../CustomComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import CreateJourneyPanel from "./CreateJourneyPanel";
import {
  JourneyData,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
  removePersonalJourney,
} from "../../../Redux/JourneySlice";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

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
    } else {
      dispatch(setWaypoinsDisplayOnMap([]));
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

  const handleCreateJourneySubmit = (newJourneyData: JourneyData) => {
    dispatch(addPersonalJourney(newJourneyData));
    setCreateJourneyOpen(false);
    dispatch(setWaypoinsDisplayOnMap([]));
  };

  const handleDeleteJourney = (journeyId: string) => {
    dispatch(removePersonalJourney({ journeyId: journeyId }));
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
        padding: "3.2rem 3.2rem",
        overflow: "overlay",
        borderRight: "1px solid rgba(0, 0, 0, 0.2)",
        "& .MuiTypography-root": {
          color: "#fff",
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        sx={{
          paddingY: "0.8rem",
        }}
      >
        <IconButton sx={{ transform: "translateX(-0.8rem)" }}>
          <FormatListBulletedIcon
            sx={{
              color: "#fff",
              fontSize: "3.6rem",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => {
            // dispatch(setWaypoinsDisplayOnMap(creactJourneyWaypointList));
            handleCreateJourneyButtonClick();
          }}
        >
          <AddIcon
            sx={{
              color: "#fff",
              transform: createJourneyOpen ? "rotate(135deg)" : "rotate(0)",
              transition: "transform 0.3s",
            }}
          />
        </IconButton>
      </Stack>
      <CreateJourneyPanel
        createJourneyOpen={createJourneyOpen}
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
          key={journey.journeyId}
          index={index}
          journeyData={journey}
          onDelete={handleDeleteJourney}
        />
      ))}
    </Box>
  );
};

export default JourneyEditor;

import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  useMediaQuery,
  Tab,
  Tabs,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CustomAccordion } from "../CustomComponents/CustomAccordion";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import CreateJourneyPanel from "./CreateJourneyPanel";
import {
  JourneyData,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
  removePersonalJourney,
  createNewJourney,
  setRecommendJourneySeed,
  getPublicRandomJourneyData,
} from "../../../Redux/JourneySlice";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SwipeableViews from "react-swipeable-views";
import { TransitionGroup } from "react-transition-group";
import {
  MaptyProButton,
  MaptyProLoadingButton,
} from "../../../components/CommonButton";

const JourneyEditor = () => {
  const dispatch = useAppDispatch();
  const { journeyDataList, currentUser } = useAppSelector((state) => ({
    journeyDataList: state.journey.personnal.jourenyList,
    currentUser: state.login.currentUser,
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

  // useEffect(() => {
  //   if (
  //     journeyAccordionList.filter(
  //       (journeyAccordion) => journeyAccordion.expanded
  //     ).length === 0
  //   ) {
  //     let allJourneyWaypoints: Waypoint[] = [];
  //     journeyDataList.forEach((journeyData) => {
  //       allJourneyWaypoints = [
  //         ...allJourneyWaypoints,
  //         ...journeyData.waypointList,
  //       ];
  //     });
  //     dispatch(setWaypoinsDisplayOnMap(allJourneyWaypoints));
  //   }
  // }, [journeyDataList]);

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
    if (currentUser == undefined) return;
    dispatch(
      createNewJourney(
        {
          username: currentUser.username,
          password: currentUser.password,
        },
        newJourneyData
      )
    );
    setCreateJourneyOpen(false);
    dispatch(setWaypoinsDisplayOnMap([]));
  };

  return (
    <>
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
        <TransitionGroup>
          <Collapse key={journey.journeyId}>
            <Box marginY="0.4rem">
              <CustomAccordion
                onAccordionChange={handleJourneyListAccordionChange}
                expanded={journey.expanded}
                index={index}
                journeyData={journey}
                onDelete={() => {}}
              />
            </Box>
          </Collapse>
        </TransitionGroup>
      ))}
    </>
  );
};

export const JourneySidePanel = () => {
  const minWidth768 = useMediaQuery("(min-width:768px)");
  const { currentUser, recommendJourneySeed } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
    recommendJourneySeed: state.journey.system.recommendJourneySeed,
  }));
  const [mode, setMode] = useState(0);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (currentUser === undefined) {
      setMode(0);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser === undefined) {
      setMode(0);
    }
  }, [currentUser]);

  const handleLoadData = async () => {
    setLoadingData(true);
    await dispatch(getPublicRandomJourneyData(recommendJourneySeed, 5));
    setLoadingData(false);
  };

  useEffect(() => {
    handleLoadData();
  }, [recommendJourneySeed]);

  return (
    <Box
      className="Discovery-Page__editor-root"
      sx={{
        width: minWidth768 ? "40rem" : "100%",
        height: minWidth768 ? "100%" : "40vh",
        position: minWidth768 ? "absolute" : "static",
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
      <Tabs
        value={mode}
        variant="fullWidth"
        sx={{
          "& .MuiTab-root": {
            color: "#fff",
            "&.Mui-selected": {
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        <Tab label="Global" onClick={() => setMode(0)} />

        {currentUser && <Tab label="Personal" onClick={() => setMode(1)} />}
      </Tabs>
      <SwipeableViews
        index={mode}
        onChangeIndex={(newIndex) => setMode(newIndex)}
      >
        <Box marginTop={"1.2rem"}>
          <MaptyProLoadingButton
            sx={{ marginBottom: "0.4rem" }}
            variant="contained"
            fullWidth
            onClick={() =>
              dispatch(
                setRecommendJourneySeed(Math.round(Math.random() * 100000000))
              )
            }
            loading={loadingData}
          >
            Refresh
          </MaptyProLoadingButton>
          <GlobalJourneyDashboard />
        </Box>
        <Box>
          <JourneyEditor />
        </Box>
      </SwipeableViews>
    </Box>
  );
};

export const GlobalJourneyDashboard = () => {
  const { recommendJourneyList } = useAppSelector((state) => ({
    recommendJourneyList: state.journey.system.recommendJourneyList,
  }));
  const dispatch = useAppDispatch();

  const [journeyAccordionList, setJourneyAccordionList] = useState(
    recommendJourneyList.map((journeyData) => ({
      expanded: false,
      ...journeyData,
    }))
  );

  useEffect(() => {
    setJourneyAccordionList(
      recommendJourneyList.map((journeyData) => ({
        ...journeyData,
        expanded: false,
      }))
    );
  }, [recommendJourneyList]);

  const handleJourneyListAccordionChange = (
    event: React.SyntheticEvent,
    index: number
  ) => {
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

  return (
    <>
      {journeyAccordionList.map((journey, index) => (
        <TransitionGroup>
          <Collapse key={journey.journeyId}>
            <Box marginY="0.4rem">
              <CustomAccordion
                onAccordionChange={handleJourneyListAccordionChange}
                expanded={journey.expanded}
                index={index}
                journeyData={journey}
                onDelete={() => {}}
              />
            </Box>
          </Collapse>
        </TransitionGroup>
      ))}
    </>
  );
};

export default JourneyEditor;

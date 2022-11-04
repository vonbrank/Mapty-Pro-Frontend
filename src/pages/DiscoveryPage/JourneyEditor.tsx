import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { CustomAccordion } from "./CustomComponents/CustomAccordion";
import { grey } from "@mui/material/colors";
import { CreateJourneyTextField } from "./CustomComponents/CustomTextField";
import { MaptyProButton } from "../../components/CommonButton";
import { JourneyWaypointList } from "./CustomComponents/Waypoint";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
} from "../../Redux/JourneySlice";

const JourneyEditor = () => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { journeyDataList, newSelectCoordinate } = useAppSelector((state) => ({
    journeyDataList: state.journey.personnal.jourenyList,
    newSelectCoordinate: state.journey.newSelectCoordinate,
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

  const [creactJourneyWaypointList, setCreateJourneyWaypointList] = useState<
    {
      label: string;
      time: string;
      coordinate?: {
        lat: number;
        lng: number;
      };
    }[]
  >([
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
  ]);

  const [createJourneyOpen, setCreateJourneyOpen] = useState(false);
  const theme = useTheme();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleJourneyListAccordionChange = (
    event: React.SyntheticEvent,
    index: number
  ) => {
    setCreateJourneyOpen(false);
    setJourneyAccordionList(
      journeyAccordionList.map((journey, currentIndex) => {
        return currentIndex == index
          ? {
              ...journey,
              expanded: !journey.expanded,
            }
          : {
              ...journey,
              expanded: false,
            };
      })
    );
  };

  const handleAddNewWaypoint = async () => {
    setCreateJourneyWaypointList([
      {
        label: "test",
        time: "8:00",
        coordinate: newSelectCoordinate,
      },
      ...creactJourneyWaypointList,
    ]);
    await dispatch(handleSelectNewCoordinate(undefined));
  };

  useEffect(() => {
    if (createJourneyOpen && newSelectCoordinate != undefined) {
      dispatch(
        setWaypoinsDisplayOnMap([
          {
            label: "test",
            time: "8:00",
            coordinate: newSelectCoordinate,
          },
          ...creactJourneyWaypointList,
        ])
      );
    }
  }, [newSelectCoordinate]);

  const handleClickCreateJourneyButton = () => {
    if (createJourneyOpen) {
      setCreateJourneyOpen(false);
    } else {
      setCreateJourneyOpen(true);
      setJourneyAccordionList(
        journeyAccordionList.map((journey, currentIndex) => {
          return {
            ...journey,
            expanded: false,
          };
        })
      );
      dispatch(setWaypoinsDisplayOnMap(creactJourneyWaypointList));
    }
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
      <Stack
        direction={"row"}
        justifyContent="flex-end"
        sx={{
          paddingY: "1.6rem",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={handleClickCreateJourneyButton}
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
      <Collapse in={createJourneyOpen}>
        <Box
          sx={{
            backgroundColor: "#44484d",
            padding: "1.6rem",
            marginBottom: "1.2rem",
          }}
        >
          <Stack spacing={"1.6rem"}>
            <Typography
              sx={{ color: "#fff", textAlign: "center", fontSize: "1.8rem" }}
            >
              Create a journey
            </Typography>
            <CreateJourneyTextField size="small" label="Title" fullWidth />
            <CreateJourneyTextField
              multiline
              rows={4}
              size="small"
              label="Description"
              fullWidth
            />
            <Collapse in={newSelectCoordinate != undefined}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Typography>New Waypoint</Typography>
                <Box
                  sx={{
                    transform: "translateX(8px)",
                    overflow: "visible",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      dispatch(
                        setWaypoinsDisplayOnMap(creactJourneyWaypointList)
                      );
                      dispatch(handleSelectNewCoordinate(undefined));
                    }}
                  >
                    <CloseIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton onClick={handleAddNewWaypoint}>
                    <DoneIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Box>
              </Stack>
              <Stack spacing={"1.6rem"}>
                <Stack direction={"row"} spacing={"1.6rem"}>
                  <CreateJourneyTextField size="small" label="Name" />
                  <CreateJourneyTextField size="small" label="Time" />
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={"1.6rem"}
                  justifyContent="space-between"
                  sx={{
                    "& .MuiTypography-root": {
                      color: "#fff",
                      "&.coordinate-number": {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <Typography>Coordinate:</Typography>
                  <Typography className="coordinate-number">
                    {newSelectCoordinate != undefined
                      ? `[${newSelectCoordinate.lat.toFixed(
                          6
                        )}, ${newSelectCoordinate.lng.toFixed(6)}]`
                      : ""}
                  </Typography>
                </Stack>
              </Stack>
            </Collapse>
            <JourneyWaypointList
              sx={{
                "&.MuiList-root": {
                  marginTop: newSelectCoordinate ? "1.6rem" : 0,
                  transition: "all 300ms",
                },
              }}
              waypointList={creactJourneyWaypointList}
            />
            <MaptyProButton
              variant="contained"
              fullWidth
              onClick={() => {
                dispatch(
                  addPersonalJourney({
                    title: "Test",
                    description: "nice",
                    waypointList: creactJourneyWaypointList,
                  })
                );
              }}
            >
              Go!
            </MaptyProButton>
          </Stack>
        </Box>
      </Collapse>
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

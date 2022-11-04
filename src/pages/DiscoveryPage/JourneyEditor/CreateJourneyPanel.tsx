import React, { useEffect, useState } from "react";
import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { CustomAccordion } from "../CustomComponents/CustomAccordion";
import { CreateJourneyTextField } from "../CustomComponents/CustomTextField";
import { MaptyProButton } from "../../../components/CommonButton";
import { JourneyWaypointList } from "../CustomComponents/Waypoint";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
} from "../../../Redux/JourneySlice";

const CreateJourneyPanel = ({
  createJourneyOpen,
  handleClickCreateJourneyButton,
}: {
  createJourneyOpen: boolean;
  handleClickCreateJourneyButton: () => void;
}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const { newSelectCoordinate } = useAppSelector((state) => ({
    newSelectCoordinate: state.journey.newSelectCoordinate,
  }));

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

  const [journeyTitle, setJourneyTitle] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [newWaypointName, setNewWaypointName] = useState("");
  const [newWaypointTime, setNewWaypointTime] = useState("");

  useEffect(() => {
    if (createJourneyOpen && newSelectCoordinate != undefined) {
      dispatch(
        setWaypoinsDisplayOnMap([
          {
            label: newWaypointName,
            time: newWaypointTime,
            coordinate: newSelectCoordinate,
          },
          ...creactJourneyWaypointList,
        ])
      );
    }
  }, [newSelectCoordinate]);

  const handleAddNewWaypoint = async () => {
    setCreateJourneyWaypointList([
      {
        label: newWaypointName,
        time: newWaypointTime,
        coordinate: newSelectCoordinate,
      },
      ...creactJourneyWaypointList,
    ]);
    dispatch(handleSelectNewCoordinate(undefined));
  };

  return (
    <>
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
          onClick={() => {
            dispatch(setWaypoinsDisplayOnMap(creactJourneyWaypointList));
            handleClickCreateJourneyButton();
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
            <CreateJourneyTextField
              size="small"
              label="Title"
              value={journeyTitle}
              onChange={(e) => {
                setJourneyTitle(e.target.value);
              }}
              fullWidth
            />
            <CreateJourneyTextField
              multiline
              rows={4}
              size="small"
              label="Description"
              value={journeyDescription}
              onChange={(e) => {
                setJourneyDescription(e.target.value);
              }}
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
                  <CreateJourneyTextField
                    size="small"
                    label="Name"
                    value={newWaypointName}
                    onChange={(e) => setNewWaypointName(e.target.value)}
                  />
                  <CreateJourneyTextField
                    size="small"
                    label="Time"
                    value={newWaypointTime}
                    onChange={(e) => setNewWaypointTime(e.target.value)}
                  />
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
                handleClickCreateJourneyButton();
                dispatch(
                  addPersonalJourney({
                    title: journeyTitle,
                    description: journeyDescription,
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
    </>
  );
};

export default CreateJourneyPanel;

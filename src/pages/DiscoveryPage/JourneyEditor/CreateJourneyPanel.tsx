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
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
} from "../../../Redux/JourneySlice";
import { red } from "@mui/material/colors";

const newJourneyErrorMessages = {
  title: "Journey title should not be empty.",
  description: "Journey description should not be empty.",
  waypoint: "You should select at least 2 waypoints for a journey.",
};

const newWaypointErrorMessages = {
  name: "Waypoint name should not be empty.",
  time: "Waypoint time should not be empty.",
};

const CreateJourneyPanel = ({
  createJourneyOpen,
  onCreateJourneyButtonClick,
  onCreateJourneySubmit,
}: {
  createJourneyOpen: boolean;
  onCreateJourneyButtonClick: () => void;
  onCreateJourneySubmit: () => void;
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
  >([]);

  const [journeyTitle, setJourneyTitle] = useState("");
  const [journeyDescription, setJourneyDescription] = useState("");
  const [newWaypointName, setNewWaypointName] = useState("");
  const [newWaypointTime, setNewWaypointTime] = useState("");

  const [newJourneyError, setNewJourneyerror] = useState(false);
  const [newJourneyErrorMessage, setNewJourneyErrorMessage] = useState("");
  const [newWaypointError, setNewWaypointerror] = useState(false);
  const [newWaypointErrorMessage, setNewWaypointErrorMessage] = useState("");

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

  const checkJourneyLegal = (): boolean => {
    if (creactJourneyWaypointList.length < 2)
      setNewJourneyErrorMessage(newJourneyErrorMessages.waypoint);
    if (journeyDescription === "")
      setNewJourneyErrorMessage(newJourneyErrorMessages.description);
    if (journeyTitle === "")
      setNewJourneyErrorMessage(newJourneyErrorMessages.title);
    const res: boolean =
      journeyTitle !== "" &&
      journeyDescription !== "" &&
      creactJourneyWaypointList.length >= 2;
    setNewJourneyerror(!res);
    return res;
  };

  const checkWaypointLegal = (): boolean => {
    if (newWaypointName === "")
      setNewWaypointErrorMessage(newWaypointErrorMessages.name);
    if (newWaypointTime === "")
      setNewWaypointErrorMessage(newWaypointErrorMessages.time);
    const res: boolean = newWaypointName !== "" && newWaypointTime !== "";
    setNewWaypointerror(!res);
    return res;
  };

  const handleAddNewWaypoint = async () => {
    if (!checkWaypointLegal()) return;
    setCreateJourneyWaypointList([
      {
        label: newWaypointName,
        time: newWaypointTime,
        coordinate: newSelectCoordinate,
      },
      ...creactJourneyWaypointList,
    ]);
    setNewWaypointName("");
    setNewWaypointTime("");
    dispatch(handleSelectNewCoordinate(undefined));
  };

  const clearNewJourneyData = () => {
    setJourneyTitle("");
    setJourneyDescription("");
    setNewWaypointName("");
    setNewWaypointTime("");
    setNewJourneyerror(false);
    setNewWaypointerror(false);
    setCreateJourneyWaypointList([]);
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
            dispatch(setWaypoinsDisplayOnMap(creactJourneyWaypointList));
            onCreateJourneyButtonClick();
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
              <Collapse in={newWaypointError}>
                <Typography
                  sx={{ "&.MuiTypography-root": { color: red[400] } }}
                >
                  {newWaypointErrorMessage}
                </Typography>
              </Collapse>
            </Collapse>
            <JourneyWaypointList
              sx={{
                "&.MuiList-root": {
                  marginTop: newSelectCoordinate ? "1.6rem" : 0,
                  paddingY:
                    creactJourneyWaypointList.length !== 0 ? "0.8rem" : 0,
                  transition: "all 300ms",
                },
              }}
              waypointList={creactJourneyWaypointList}
            />
            <Collapse in={newJourneyError}>
              <Typography sx={{ "&.MuiTypography-root": { color: red[400] } }}>
                {newJourneyErrorMessage}
              </Typography>
            </Collapse>
            <MaptyProButton
              sx={{
                "&.MuiButtonBase-root": {
                  marginTop: newJourneyError ? "1.6rem" : 0,
                  transition: "all 300ms",
                },
              }}
              variant="contained"
              fullWidth
              onClick={() => {
                if (!checkJourneyLegal()) return;
                onCreateJourneySubmit();
                dispatch(
                  addPersonalJourney({
                    title: journeyTitle,
                    description: journeyDescription,
                    waypointList: creactJourneyWaypointList,
                  })
                );
                clearNewJourneyData();
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

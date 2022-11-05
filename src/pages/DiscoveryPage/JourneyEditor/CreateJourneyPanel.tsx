import React, { useEffect, useState } from "react";
import { Box, Collapse, IconButton, Stack, Typography } from "@mui/material";

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
  JourneyData,
} from "../../../Redux/JourneySlice";
import { red } from "@mui/material/colors";
import dayjs, { Dayjs } from "dayjs";
import CreateJourneyPicker from "../CustomComponents/CustomTimePicker";

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
  onCreateJourneySubmit,
}: {
  createJourneyOpen: boolean;
  onCreateJourneySubmit: (newJourneyData: JourneyData) => void;
}) => {
  const dispatch = useAppDispatch();

  const { newSelectCoordinate } = useAppSelector((state) => ({
    newSelectCoordinate: state.journey.newSelectCoordinate,
  }));
  const [newJourneyData, setNewJourneyData] = useState<JourneyData>({
    title: "",
    description: "",
    waypointList: [],
  });

  const [newJourneyError, setNewJourneyerror] = useState(false);
  const [newJourneyErrorMessage, setNewJourneyErrorMessage] = useState("");

  const checkJourneyLegal = (): boolean => {
    if (newJourneyData.waypointList.length < 2)
      setNewJourneyErrorMessage(newJourneyErrorMessages.waypoint);
    if (newJourneyData.description === "")
      setNewJourneyErrorMessage(newJourneyErrorMessages.description);
    if (newJourneyData.title === "")
      setNewJourneyErrorMessage(newJourneyErrorMessages.title);
    const res: boolean =
      newJourneyData.title !== "" &&
      newJourneyData.description !== "" &&
      newJourneyData.waypointList.length >= 2;
    setNewJourneyerror(!res);
    return res;
  };

  const clearNewJourneyData = () => {
    setNewJourneyData({
      title: "",
      description: "",
      waypointList: [],
    });
    setNewJourneyerror(false);
  };

  const handleAddNewWaypoint = (newWaypoint: {
    label: string;
    time: string;
    coordinate?: {
      lat: number;
      lng: number;
    };
  }) => {
    setNewJourneyData({
      ...newJourneyData,
      waypointList: [newWaypoint, ...newJourneyData.waypointList],
    });
    setNewWaypoint({
      label: "",
      time: "",
    });
  };

  const [newWaypoint, setNewWaypoint] = useState<Waypoint>({
    label: "",
    time: "",
  });

  useEffect(() => {
    if (createJourneyOpen)
      setNewWaypoint({
        ...newWaypoint,
        coordinate: newSelectCoordinate,
      });
  }, [newSelectCoordinate]);

  useEffect(() => {
    dispatch(
      setWaypoinsDisplayOnMap([newWaypoint, ...newJourneyData.waypointList])
    );
  }, [newWaypoint]);

  // console.log(`[Create new journey pannel] new waypoint: `, newWaypoint);

  return (
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
            value={newJourneyData.title}
            onChange={(e) => {
              setNewJourneyData({
                ...newJourneyData,
                title: e.target.value,
              });
            }}
            fullWidth
          />
          <CreateJourneyTextField
            multiline
            rows={4}
            size="small"
            label="Description"
            value={newJourneyData.description}
            onChange={(e) => {
              setNewJourneyData({
                ...newJourneyData,
                description: e.target.value,
              });
            }}
            fullWidth
          />
          <CreateWaypointPanel
            newWaypoint={newWaypoint}
            onNewWaypointChange={setNewWaypoint}
            onAddNewWaypoint={handleAddNewWaypoint}
          />
          <JourneyWaypointList
            sx={{
              "&.MuiList-root": {
                marginTop: newSelectCoordinate ? "1.6rem" : 0,
                paddingY:
                  newJourneyData.waypointList.length !== 0 ? "0.8rem" : 0,
                transition: "all 300ms",
              },
            }}
            waypointList={newJourneyData.waypointList}
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
            onClick={(e) => {
              if (!checkJourneyLegal()) return;
              onCreateJourneySubmit(newJourneyData);
              clearNewJourneyData();
            }}
          >
            Go!
          </MaptyProButton>
        </Stack>
      </Box>
    </Collapse>
  );
};

interface Waypoint {
  label: string;
  time: string;
  coordinate?: {
    lat: number;
    lng: number;
  };
}

const CreateWaypointPanel = ({
  newWaypoint,
  onNewWaypointChange = () => {},
  onAddNewWaypoint = () => {},
}: {
  newWaypoint: Waypoint;
  onNewWaypointChange?: (newWaypoint: Waypoint) => void;
  onAddNewWaypoint?: (newWaypoint: Waypoint) => void;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { newSelectCoordinate } = useAppSelector((state) => ({
    newSelectCoordinate: state.journey.newSelectCoordinate,
  }));

  const handleAddNewWaypoint = async () => {
    if (!checkWaypointLegal()) return;
    onAddNewWaypoint(newWaypoint);
    dispatch(handleSelectNewCoordinate(undefined));
  };

  const checkWaypointLegal = (): boolean => {
    if (newWaypoint.label === "")
      setNewWaypointErrorMessage(newWaypointErrorMessages.name);
    if (newWaypoint.time === "")
      setNewWaypointErrorMessage(newWaypointErrorMessages.time);
    const res: boolean = newWaypoint.label !== "" && newWaypoint.time !== "";
    setNewWaypointerror(!res);
    return res;
  };

  const [newWaypointError, setNewWaypointerror] = useState(false);
  const [newWaypointErrorMessage, setNewWaypointErrorMessage] = useState("");

  return (
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
              dispatch(handleSelectNewCoordinate(undefined));
              onNewWaypointChange({
                label: "",
                time: "",
              });
              setNewWaypointErrorMessage("");
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
            value={newWaypoint.label}
            onChange={(e) =>
              onNewWaypointChange({
                ...newWaypoint,
                label: e.target.value,
              })
            }
          />
          <CreateJourneyPicker
            label="Time"
            value={
              newWaypoint.time !== "" ? dayjs(newWaypoint.time, "HH-mm") : null
            }
            onChange={(newValue) =>
              onNewWaypointChange({
                ...newWaypoint,
                time: newValue ? `${newValue.hour()}-${newValue.minute()}` : "",
              })
            }
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
        <Typography sx={{ "&.MuiTypography-root": { color: red[400] } }}>
          {newWaypointErrorMessage}
        </Typography>
      </Collapse>
    </Collapse>
  );
};

export default CreateJourneyPanel;

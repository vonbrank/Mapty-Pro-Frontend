import React from "react";
import {
  List,
  ListItemButton,
  Stack,
  Typography,
  Box,
  SxProps,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Theme } from "@mui/system";
import dayjs from "dayjs";

export const JourneyWaypointList = ({
  waypointList,
  sx,
}: {
  waypointList: {
    label: string;
    time: string;
  }[];
  sx?: SxProps<Theme>;
}) => {
  return (
    <List sx={sx}>
      {waypointList.map((waypoint, index) => (
        <ListItemButton key={index}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            key={index}
            sx={{ width: "100%" }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#fff",
              }}
            >
              {waypoint.label}
            </Typography>
            <Box
              sx={{
                fontSize: "1.2rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: blue[300],
                borderRadius: "100rem",
                color: "#fff",
              }}
            >
              {waypoint.time !== ""
                ? dayjs(waypoint.time, "HH-mm").format("HH:mm")
                : ""}
            </Box>
          </Stack>
        </ListItemButton>
      ))}
    </List>
  );
};

export const WaypointPopUpCard = ({
  label,
  time,
}: {
  label: string;
  time: string;
}) => {
  return (
    <Stack justifyContent={"space-between"} alignItems={"center"}>
      <Typography
        sx={{
          "&.MuiTypography-root": {
            textTransform: "capitalize",
            color: "#000",
            margin: 0,
          },
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          fontSize: "1.2rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: blue[300],
          borderRadius: "100rem",
          color: "#fff",
          width: "100%",
          textAlign: "center",
        }}
      >
        {dayjs(time, "HH-mm").format("HH:mm")}
      </Box>
    </Stack>
  );
};

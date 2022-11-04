import React from "react";
import { List, ListItemButton, Stack, Typography, Box } from "@mui/material";
import { blue } from "@mui/material/colors";

export const JourneyWaypointList = ({
  waypointList,
}: {
  waypointList: {
    label: string;
    time: string;
  }[];
}) => {
  return (
    <List>
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
              {waypoint.time}
            </Box>
          </Stack>
        </ListItemButton>
      ))}
    </List>
  );
};

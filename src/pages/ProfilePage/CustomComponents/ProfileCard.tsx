import { Paper, Stack, Box, Typography } from "@mui/material";
import React from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { ReactComponent as ProfilePhotoPlaceholder } from "../assets/ProfilePhotoPlaceholder.svg";

const ProfileCard = ({ className }: { className?: string }) => {
  return (
    <Paper
      className={`Profile-Card ${className ? className : ""}`}
      elevation={2}
      sx={{
        width: "36rem",
        padding: "3.2rem",
        "& .Profile-Card": {
          "&__profile-photo-box": {
            padding: "3.2rem",
            border: "0.4rem solid rgb(175, 175, 175)",
            borderRadius: "12.8rem",
          },
          "&__journey-number": {
            width: "12.8rem",
            "&-num": {
              fontSize: "3.6rem",
            },
            "&-text": {
              fontSize: "2.4rem",
            },
          },
          "&__button-group": {
            width: "100%",
            "& button": {
              fontSize: "1.8rem",
            },
          },
          "&__full-name": {
            fontSize: "2.4rem",
          },
          "&__email": {
            fontSize: "2.4rem",
            color: "#808080",
          },
        },
      }}
    >
      <Stack className="Profile-Card-root" alignItems="center" spacing="2.4rem">
        <Box className="Profile-Card__profile-photo-box">
          <ProfilePhotoPlaceholder />
        </Box>
        <Typography className="Profile-Card__full-name">Full Name</Typography>
        <Typography className="Profile-Card__email">
          test@example.com
        </Typography>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          className="Profile-Card__journey-number"
        >
          <Typography className="Profile-Card__journey-number-num">
            12
          </Typography>
          <Typography className="Profile-Card__journey-number-text">
            Journeys
          </Typography>
        </Stack>
        <Stack spacing="1.2rem" className="Profile-Card__button-group">
          <MaptyProButton variant="contained" fullWidth>
            Edit
          </MaptyProButton>
          <MaptyProButton variant="contained" fullWidth>
            Change Password
          </MaptyProButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfileCard;

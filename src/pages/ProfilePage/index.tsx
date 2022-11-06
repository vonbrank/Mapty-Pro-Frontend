import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { MaptyProButton } from "../../components/CommonButton";
import ProfileCard from "./CustomComponents/ProfileCard";
import {
  JourneyBriefInfo,
  JourneyCard,
  JourneyRecommendationList,
} from "../../components/CommonCard";

const ProfilePage = () => {
  const minWidth900 = useMediaQuery("(min-width:900px)");

  return (
    <Box
      sx={{
        paddingY: "6.4rem",
        "& .Profile-Page": {
          "&__main-box": {
            flexGrow: 1,
          },
          "&__heading-text": {
            fontSize: "3.6rem",
            fontWeight: 500,
          },
          "&__heading-button": {
            fontSize: "1.8rem",
          },
          "&__profile-card": {
            flexShrink: 0,
          },
        },
      }}
    >
      <Container>
        <Stack
          direction={minWidth900 ? "row" : "column-reverse"}
          spacing="4.8rem"
          alignItems="flex-start"
        >
          <ProfileCard className="Profile-Page__profile-card" />
          <Box className="Profile-Page__main-box">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="Profile-Page__heading-text">
                Your Profile Page
              </Typography>
              <MaptyProButton
                className="Profile-Page__heading-button"
                variant="contained"
              >
                Create
              </MaptyProButton>
            </Stack>
            <Stack spacing="3rem" marginTop="3.6rem">
              {JourneyRecommendationList.map((journeyBriefInfo, index) => (
                <JourneyCard key={index} {...journeyBriefInfo} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfilePage;

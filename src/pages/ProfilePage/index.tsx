import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { MaptyProButton } from "../../components/CommonButton";
import ProfileCard from "./CustomComponents/ProfileCard";
import {
  JourneyBriefInfo,
  JourneyCard,
  JourneyRecommendationList,
} from "../../components/CommonCard";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  getUserJourneyData,
  setPersonalJourney,
} from "../../Redux/JourneySlice";

const ProfilePage = () => {
  const minWidth900 = useMediaQuery("(min-width:900px)");

  const { currentUser, jourenyList } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
    jourenyList: state.journey.personnal.jourenyList,
  }));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === undefined) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser == undefined) {
      dispatch(setPersonalJourney([]));
    } else {
      dispatch(
        getUserJourneyData({
          username: currentUser.username,
          password: currentUser.password,
        })
      );
    }
  }, [currentUser, dispatch]);

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
              {jourenyList.map((journey, index) => (
                <JourneyCard
                  key={journey.journeyId}
                  title={journey.title}
                  content={journey.description}
                  imgSrc={
                    JourneyRecommendationList[
                      index % JourneyRecommendationList.length
                    ].imgSrc
                  }
                  waypoints={journey.waypointList}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfilePage;

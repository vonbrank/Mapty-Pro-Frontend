import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Collapse,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { ReactComponent as RecommendationRefreshIcon } from "../assets/RecommendationRefreshIcon.svg";
import {
  JourneyBriefInfo,
  JourneyCard,
  JourneyRecommendationList,
} from "../../../components/CommonCard";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  setRecommendJourneySeed,
  getPublicRandomJourneyData,
} from "../../../Redux/JourneySlice";
import { TransitionGroup } from "react-transition-group";

const RecommendationSection = () => {
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const { recommendJourneyList, recommendJourneySeed } = useAppSelector(
    (state) => ({
      recommendJourneyList: state.journey.system.recommendJourneyList,
      recommendJourneySeed: state.journey.system.recommendJourneySeed,
    })
  );

  const changeRecommendJourneySeed = () => {
    dispatch(setRecommendJourneySeed(Math.round(Math.random() * 100000000)));
  };

  const [isLoadingData, setIsLoadingData] = useState(false);
  const handleLoadPublicRandomJourneyData = async () => {
    setIsLoadingData(true);
    await dispatch(getPublicRandomJourneyData(recommendJourneySeed, 3));
    setIsLoadingData(false);
  };

  useEffect(() => {
    changeRecommendJourneySeed();
  }, []);

  useEffect(() => {
    handleLoadPublicRandomJourneyData();
  }, [recommendJourneySeed]);

  return (
    <Box
      sx={{
        paddingY: "6.4rem",
        "& .Recommendation-Section": {
          "&__title": {
            fontSize: "3rem",
            color: "rgba(76, 76, 76)",
            textTransform: "uppercase",
          },
        },
      }}
    >
      <Container>
        <Stack
          direction="row"
          spacing="2.4rem"
          justifyContent="center"
          alignItems={"center"}
        >
          <Typography className="Recommendation-Section__title">
            {formatMessage({ id: "homePage.recommendation.heading" })}
          </Typography>
          <IconButton onClick={changeRecommendJourneySeed}>
            {isLoadingData ? (
              <CircularProgress size="24px" />
            ) : (
              <RecommendationRefreshIcon />
            )}
          </IconButton>
        </Stack>
        <Box marginTop="3.6rem">
          <TransitionGroup>
            {recommendJourneyList.map((journey, index) => (
              <Collapse key={journey.journeyId}>
                <Box marginY="1.6rem">
                  <JourneyCard
                    title={journey.title}
                    content={journey.description}
                    imgSrc={
                      JourneyRecommendationList[
                        index % JourneyRecommendationList.length
                      ].imgSrc
                    }
                    waypoints={journey.waypointList}
                  />
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default RecommendationSection;

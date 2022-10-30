import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { ReactComponent as RecommendationRefreshIcon } from "../assets/RecommendationRefreshIcon.svg";
import {
  JourneyBriefInfo,
  JourneyCard,
  JourneyRecommendationList,
} from "../../../components/CommonCard";

const RecommendationSection = () => {
  return (
    <Box
      sx={{
        paddingY: "6.4rem",
        "& .Recommendation-Section": {
          "&__title": {
            fontSize: "3rem",
            color: "rgba(76, 76, 76)",
          },
        },
      }}
    >
      <Container>
        <Stack direction="row" spacing="2.4rem" justifyContent="center">
          <Typography className="Recommendation-Section__title">
            RECOMMENDATION
          </Typography>
          <IconButton>
            <RecommendationRefreshIcon />
          </IconButton>
        </Stack>
        <Stack spacing="3rem" marginTop="3.6rem">
          {JourneyRecommendationList.map((journeyBriefInfo, index) => (
            <JourneyCard key={index} {...journeyBriefInfo} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default RecommendationSection;

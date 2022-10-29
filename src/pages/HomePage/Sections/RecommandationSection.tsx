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

interface JourneyBriefInfo {
  title: string;
  content: string;
  imgSrc: string;
}

const JourneyRecommendationList: JourneyBriefInfo[] = [
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-8.webp",
  },
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-9.webp",
  },
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-10.webp",
  },
];

const RecommendationCard = ({ title, content, imgSrc }: JourneyBriefInfo) => {
  return (
    <Paper
      elevation={2}
      sx={{
        padding: "1.6rem",
        "&:hover": {
          "& .Recommendation-Card__image-box img": {
            transform: "scale(1.2)",
          },
        },
        "& .Recommendation-Card": {
          "&__image-box": {
            height: "12.8rem",
            width: "12.8rem",
            flexShrink: 0,
            borderRadius: "100rem",
            overflow: "hidden",
            "& img": {
              height: "100%",
              width: "100%",
              transition: "all 0.5s",
            },
          },
          "&__title": {
            fontSize: "2rem",
            fontWeight: "600",
            color: "#4c4c4c",
          },
          "&__content": {
            marginTop: "1.2rem",
            marginBottom: "1.8rem",
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing="3.2rem">
        <Box className="Recommendation-Card__image-box">
          <img src={imgSrc} alt={title} />
        </Box>
        <Box>
          <Typography className="Recommendation-Card__title">
            {title}
          </Typography>
          <Typography className="Recommendation-Card__content">
            {content}
          </Typography>
          <MaptyProButton variant="outlined">More</MaptyProButton>
        </Box>
      </Stack>
    </Paper>
  );
};

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
          {JourneyRecommendationList.map((journeyBriefInfo) => (
            <RecommendationCard
              key={journeyBriefInfo.title}
              {...journeyBriefInfo}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default RecommendationSection;

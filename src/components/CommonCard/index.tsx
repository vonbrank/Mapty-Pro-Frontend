import React from "react";
import { Paper, Box, Stack, Typography } from "@mui/material";
import { MaptyProButton } from "../CommonButton";

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

const JourneyCard = ({ title, content, imgSrc }: JourneyBriefInfo) => {
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
              objectFit: "cover",
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
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
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
export { JourneyCard, JourneyRecommendationList };
export type { JourneyBriefInfo };

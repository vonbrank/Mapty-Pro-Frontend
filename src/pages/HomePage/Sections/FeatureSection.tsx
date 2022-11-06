import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { MapExample } from "../../../components/LeafletMap";

interface FeatureContent {
  title: string;
  content: string;
}

const FeatureList: FeatureContent[] = [
  {
    title: "Recording your trails",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. ",
  },
  {
    title: "Share to others",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. ",
  },
  {
    title: "Synchronize between devices",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. ",
  },
];

const Feature = ({ title, content }: FeatureContent) => {
  return (
    <Stack
      spacing="1.6rem"
      className="Feature"
      sx={{
        position: "relative",
        // overflow: "hidden",
        "& .Feature": {
          "&__title": {
            fontSize: "2.4rem",
            fontWeight: 600,
          },
          "&__content": {
            fontSize: "2.6rem",
          },
        },
        "&::after": {
          content: "''",
          position: "absolute",
          height: "100%",
          width: "1.2rem",
          backgroundColor: "#eee",
          transform: "translateX(-7.2rem)",
          transition: "all 0.3s",
          opacity: 0,
        },
        "&:hover::after": {
          transform: "translateX(-6.4rem)",
          opacity: 1,
        },
      }}
    >
      <Typography className="Feature__title">{title}</Typography>
      <Typography className="Feature_content">{content}</Typography>
    </Stack>
  );
};

const FeatureSection = () => {

  return (
    <Box
      className="Home-Page-Feature-Section"
      sx={{
        height: "96rem",
        position: "relative",
        zIndex: 500,
        backgroundColor: "#000",
        overflow: "hidden",
        "& .Home-Page-Feature-Section": {
          "&__background-image": {
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          },
          "&__background-map": {
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.8,
          },
          "&__feature-container": {
            maxWidth: "100vw",
            display: "flex",
            justifyContent: "flex-end",
            padding: 0,
            height: "100%",
          },
          "&__feature-background": {
            width: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            paddingX: "6.4rem",
            transform: "translateX(2.4rem)",
            overflow: "hidden",
          },
          "&__feature-box": {
            height: "100%",
            maxWidth: "51.2rem",
          },
        },
      }}
    >
      <Container className="Home-Page-Feature-Section__feature-container">
        <Box className="Home-Page-Feature-Section__feature-background">
          <Stack
            spacing="6.4rem"
            justifyContent="center"
            className="Home-Page-Feature-Section__feature-box"
          >
            {FeatureList.map((featureContent) => (
              <Feature key={featureContent.title} {...featureContent} />
            ))}
            <MaptyProButton
              variant="contained"
              sx={{
                textTransform: "none",
                "&:first-letter": {
                  textTransform: "capitalize",
                },
              }}
            >
              Start a journey
            </MaptyProButton>
          </Stack>
        </Box>
      </Container>
      <Box className="Home-Page-Feature-Section__background-map">
        <MapExample sx={{ width: "100%", height: "100%" }} />
      </Box>
      {/* <img
        className="Home-Page-Feature-Section__background-image"
        src="https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/leaflet-demo.webp"
        alt="leaflet demo"
      /> */}
    </Box>
  );
};

export default FeatureSection;

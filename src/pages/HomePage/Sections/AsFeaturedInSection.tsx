import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const logoList: { label: string; url: string }[][] = [
  [
    {
      label: "React.js",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/react-js.webp",
    },
    {
      label: "Pixso",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/pixso-logo.webp",
    },
    {
      label: "MySQL",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/MySQL-Logo.webp",
    },
    {
      label: "SpringBoot",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/spring-boot-logo.webp",
    },
  ],
  [
    {
      label: "Leaflet",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/Leaflet_logo.webp",
    },
    {
      label: "Docker",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/docker-logo.webp",
    },
    {
      label: "Unsplash",
      url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/unsplash-logo.webp",
    },
  ],
];

const AsFeaturedInSection = () => {
  return (
    <Box
      className="As-Feature-In-Section"
      sx={{
        marginY: "3.6rem",
        paddingY: "3.6rem",
        "& .As-Feature-In-Section": {
          "&__heading": {
            textAlign: "center",
            fontSize: "1.4rem",
            color: "#888",
            marginBottom: "1.6rem",
          },
          "&__logo": {
            height: "4.8rem",
            "&--height": {
              height: "9.6rem",
            },
          },
        },
      }}
    >
      <Container>
        <Typography className="As-Feature-In-Section__heading">
          AS FEATURED IN
        </Typography>
        <Stack spacing="5.6rem">
          {logoList.map((currentRow, index) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing="5.6rem"
              key={index}
            >
              {currentRow.map((currentItem, index) => (
                <img
                  className={`As-Feature-In-Section__logo ${
                    currentItem.label === "Pixso" ||
                    currentItem.label === "MySQL"
                      ? "As-Feature-In-Section__logo--height"
                      : ""
                  }`}
                  src={currentItem.url}
                  alt={currentItem.label}
                  key={index}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default AsFeaturedInSection;

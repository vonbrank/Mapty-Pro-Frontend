import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

const HomePage = () => {
  return (
    <Box>
      <Stack
        height="calc(100vh - 7.2rem)"
        className="Home-Page-Hero-Section"
        justifyContent="center"
        sx={{
          "&.Home-Page-Hero-Section": {
            position: "relative",
            zIndex: 500,
            "& .Home-Page-Hero-Section": {
              "&__image": {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover",
                zIndex: -1,
              },
              "&__image-mask": {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#000",
                opacity: 0.3,
                zIndex: -1,
              },
            },
            "& .Home-Page__Heading-Primary": {
              color: "#fff",
              zIndex: 0,
              width: "50%",
              "&--main": {
                fontSize: "4.8rem",
                fontWeight: "400",
              },
              "&--sub": {
                fontSize: "2.4rem",
                fontWeight: "300",
              },
            },
          },
        }}
      >
        <Container>
          <Stack spacing="2.4rem" className="Home-Page__Heading-Primary">
            <Typography className="Home-Page__Heading-Primary--main">
              Recording your trails in your journey
            </Typography>
            <Typography className="Home-Page__Heading-Primary--sub">
              From prestine water, to majectic forest -- <br /> we've got it all
            </Typography>
          </Stack>
        </Container>
        <img
          className="Home-Page-Hero-Section__image"
          src="https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/hero-unsplash-squoosh.jpg"
        />
        <Box className="Home-Page-Hero-Section__image-mask" />
      </Stack>
    </Box>
  );
};

export default HomePage;

import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CustomContributorCard } from "./CustomComponents/CustomCard";

const AboutPage = () => {
  const theme = useTheme();
  const minWidth768 = useMediaQuery("(min-width:768px)");

  return (
    <Container
      sx={{
        paddingY: "3.6rem",
        "& .About-Page": {
          "&-heading-primary": {
            fontSize: "3.6rem",
            textAlign: "center",
            marginBottom: "2.4rem",
            fontWeight: 600,
          },
          "&-heading-secondary": {
            fontSize: "2.4rem",
            marginBottom: "1.6rem",
          },
          "&-text-content": {
            fontSize: "1.8rem",
          },
          "&-link": {
            color: theme.palette.primary.main,
            textDecoration: "none",
            position: "relative",
            "&::after": {
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: 0,
              height: "1px",
              width: 0,
              transition: "width 0.3s",
              backgroundColor: theme.palette.primary.main,
            },
            "&:hover::after": {
              width: "100%",
            },
          },
        },
      }}
    >
      <Typography className="About-Page-heading-primary">About Us</Typography>
      <Stack spacing="4.4rem">
        <Box>
          <Typography className="About-Page-text-content">
            This project is inspired by{" "}
            <Link className="About-Page-link" to={"."}>
              Mapty
            </Link>{" "}
            , a web app created by{" "}
            <Link className="About-Page-link" to={"."}>
              Jonas Schmedtmann
            </Link>{" "}
            and used to teach how to manage a map in JavaScript.{" "}
            <Link className="About-Page-link" to={"."}>
              Mapty Pro
            </Link>{" "}
            is an all-round improvement of Mapty. To satisfy the requirement of
            the final assignment in the course provided by Harbin Institute of
            Technology:{" "}
            <Link className="About-Page-link" to={"."}>
              [CS33461: Service-Oriented Software Systems]
            </Link>{" "}
            , we developed Mapty Pro. Not only simple function based on a public
            Map API has been implemented, but also some other services are
            deployed in our back-end server including login, sharing and more.
          </Typography>
        </Box>
        <Box>
          <Typography className="About-Page-heading-secondary">
            Contributors
          </Typography>
          <Box>
            <Stack
              direction={minWidth768 ? "row" : "column"}
              justifyContent="space-between"
              spacing="2.4rem"
            >
              <CustomContributorCard name="Von Brank" />
              <CustomContributorCard name="Seatle" />
              <CustomContributorCard name="Liar" />
            </Stack>
          </Box>
        </Box>
        <Box>
          <Typography className="About-Page-heading-secondary">
            Open Source
          </Typography>
          <Typography className="About-Page-text-content">
            This project will be open source after the course. Pull request,
            donation and any other ways for contribution are welcomed!
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default AboutPage;

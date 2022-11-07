import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CustomContributorCard } from "./CustomComponents/CustomCard";

const AboutPage = () => {
  const theme = useTheme();

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
              bottom: 0,
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
      <Stack spacing="2.4rem">
        <Box>
          <Typography className="About-Page-text-content">
            This project is inspired by{" "}
            <Link className="About-Page-link" to={"."}>
              Mapty
            </Link>{" "}
            , another web app created by{" "}
            <Link className="About-Page-link" to={"."}>
              Jonas Schmedtmann
            </Link>{" "}
            and used to teach how to manage a map in JavaScript. Mapty Pro is an
            all-round improvement of Mapty. To satisfy the requirement of final
            assignment in the course:{" "}
            <Link className="About-Page-link" to={"."}>
              [CS33461: Service-Oriented Software Systems]
            </Link>{" "}
            , we developed Mapty Pro. Not only simple function based on a public
            Map API is provided, but also login, sharing and more services are
            deployed in our back-end server.
          </Typography>
        </Box>
        <Box>
          <Typography className="About-Page-heading-secondary">
            Contributors
          </Typography>
          <Box>
            <Stack direction={"row"} justifyContent="space-between">
              <CustomContributorCard />
              <CustomContributorCard />
              <CustomContributorCard />
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

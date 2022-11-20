import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { CustomContributorCard } from "./CustomComponents/CustomCard";

const AboutPage = () => {
  const theme = useTheme();
  const minWidth768 = useMediaQuery("(min-width:768px)");
  const intl = useIntl();

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
            color: grey[700],
          },
          "&-link": {
            color: theme.palette.primary.main,
            textDecoration: "none",
            position: "relative",
            whiteSpace: "nowrap",
            "&::after": {
              content: `""`,
              position: "absolute",
              bottom: "-2px",
              left: 0,
              height: "1.5px",
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
      <Typography className="About-Page-heading-primary">
        {intl.messages["about.headings.primary"].toString()}
      </Typography>
      <Stack spacing="4.4rem">
        <Box>
          <Typography className="About-Page-text-content">
            <FormattedMessage
              id="about.introduction"
              values={{
                link: (msg) => (
                  <Link className="About-Page-link" to={"."}>
                    {msg}
                  </Link>
                ),
              }}
            />
          </Typography>
        </Box>
        <Box>
          <Typography className="About-Page-heading-secondary">
            {intl.messages["about.headings.contributors"].toString()}
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
            {intl.messages["about.headings.openSource"].toString()}
          </Typography>
          <Typography className="About-Page-text-content">
            {intl.messages["about.content.openSource"].toString()}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default AboutPage;

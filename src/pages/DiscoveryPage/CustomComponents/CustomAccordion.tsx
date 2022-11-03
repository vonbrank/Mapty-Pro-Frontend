import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JourneyData } from "..";
import { blue } from "@mui/material/colors";

const CustomAccordion = ({
  expanded,
  onAccordionChange: onChange,
  index,
  journeyData,
}: {
  expanded: boolean;
  onAccordionChange: (event: React.SyntheticEvent, index: number) => void;
  index: number;
  journeyData: JourneyData;
}) => {
  return (
    <Accordion expanded={expanded} onChange={(e) => onChange(e, index)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`journey-data-${index}-content`}
      >
        <Typography>{journeyData.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            textTransform: "capitalize",
          }}
        >
          {journeyData.description}
        </Typography>
        <Stack spacing={"0.8rem"} marginTop={"1.6rem"}>
          {journeyData.waypointList.map((waypoint, index) => (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              key={index}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {waypoint.label}
              </Typography>
              <Box
                sx={{
                  fontSize: "1.2rem",
                  padding: "0.6rem 1.2rem",
                  backgroundColor: blue[300],
                  borderRadius: "100rem",
                }}
              >
                {waypoint.time}
              </Box>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export { CustomAccordion };

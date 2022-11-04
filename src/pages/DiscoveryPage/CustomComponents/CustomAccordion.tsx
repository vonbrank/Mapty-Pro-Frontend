import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  Box,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JourneyData } from "../../../Redux/JourneySlice";
import { blue } from "@mui/material/colors";
import { JourneyWaypointList } from "./Waypoint";

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
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 500 }}>
          {journeyData.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            textTransform: "capitalize",
          }}
        >
          {journeyData.description}
        </Typography>
        <Divider
          sx={{
            borderColor: "rgba(255, 255, 255, 0.5)",
            marginTop: "1.2rem",
          }}
        />
        <Stack spacing={"0.8rem"}>
          <JourneyWaypointList waypointList={journeyData.waypointList} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export { CustomAccordion };

import React, { useState } from "react";
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
  Dialog,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { JourneyData, UniqueJourneyData } from "../../../Redux/JourneySlice";
import { blue } from "@mui/material/colors";
import { JourneyWaypointList } from "./Waypoint";
import { MaptyProButton } from "../../../components/CommonButton";

const ConfirmDeleteDialog = ({
  open,
  onClose,
  onConfirmDelete,
}: {
  open: boolean;
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  onConfirmDelete: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: "2.4rem" }}>
        <Stack spacing={"2rem"}>
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 500 }}>
            Are you sure you want to delete the journey?
          </Typography>
          <Stack direction={"row"} justifyContent="flex-end" spacing={"1.8rem"}>
            <MaptyProButton onClick={() => onClose()}>Cancel</MaptyProButton>
            <MaptyProButton onClick={onConfirmDelete}>Confirm</MaptyProButton>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};

const CustomAccordion = ({
  expanded,
  onAccordionChange: onChange,
  index,
  journeyData,
  onDelete,
}: {
  expanded: boolean;
  onAccordionChange: (event: React.SyntheticEvent, index: number) => void;
  index: number;
  journeyData: UniqueJourneyData;
  onDelete: (journeyId: string) => void;
}) => {
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const handleConfirmDelete = () => {
    onDelete(journeyData.journeyId);
  };

  return (
    <Accordion expanded={expanded} onChange={(e) => onChange(e, index)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`journey-data-${index}-content`}
      >
        <Stack
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 500 }}>
            {journeyData.title}
          </Typography>
          <MaptyProButton
            onClick={(e) => {
              e.stopPropagation();
              setConfirmDeleteDialogOpen(true);
            }}
          >
            Delete
          </MaptyProButton>
        </Stack>
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
      <ConfirmDeleteDialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </Accordion>
  );
};

export { CustomAccordion };

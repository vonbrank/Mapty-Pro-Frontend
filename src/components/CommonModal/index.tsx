import React, { ReactElement } from "react";
import {
  Modal,
  ModalProps,
  Fade,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type MaptyProModalProps = ModalProps & {
  title: string;
  handleClose?: () => void;
};

export const MaptyProModal = ({
  children = <></>,
  open = false,
  handleClose = () => {},
  title = "",
}: MaptyProModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "64rem",
            height: "64rem",
            maxWidth: "100vw",
            maxHeight: "calc(100vh - 12.8rem)",
          }}
        >
          <Stack
            sx={{
              padding: "3.2rem",
              backgroundColor: "#fff",
              borderRadius: "1.2rem",
              position: "relative",
              height: "100%",
            }}
            className="MaptyProModalBox-root"
          >
            <IconButton
              sx={{ position: "absolute", top: "0.4rem", right: "0.4rem" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ fontSize: "2.4rem" }}>{title}</Typography>
            <Box sx={{ flexGrow: 1, overflow: "overlay" }}>{children}</Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

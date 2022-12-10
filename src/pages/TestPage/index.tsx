import React from "react";
import {
  Stack,
  Button,
  Snackbar,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { MaptyProToast } from "../../components/CommonSnackBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { useAppDispatch } from "../../Redux/hooks";
import { showTemporaryToastText } from "../../Redux/ToastSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} onClose={handleClose}>
        <Box>
          <Stack spacing={1}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
          </Stack>
        </Box>
      </Snackbar>
    </Stack>
  );
}

const TestPage = () => {
  const dispatch = useAppDispatch();
  const handleAddAlert = () => {
    dispatch(
      showTemporaryToastText({
        message: "This is a success message!",
      })
    );
  };
  return (
    <>
      <Button variant="outlined" onClick={handleAddAlert}>
        Open success snackbar
      </Button>
      <MaptyProToast />
    </>
  );
};

export default TestPage;

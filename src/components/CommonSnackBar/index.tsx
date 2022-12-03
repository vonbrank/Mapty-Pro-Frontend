import React, { useState, useEffect } from "react";
import { Button, Snackbar, Box, Alert, Collapse, List } from "@mui/material";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  showTemporaryToastText,
  removeAlertById,
} from "../../Redux/ToastSlice";

export const MaptyProToast = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const { alertList } = useAppSelector((state) => ({
    alertList: state.toast.alertList,
  }));

  useEffect(() => {
    if (alertList.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
    console.log(alertList);
  }, [alertList]);

  return (
    <Snackbar open={open}>
      <Box sx={{ mt: 1, width: "36rem" }}>
        <List>
          <TransitionGroup>
            {alertList.map((alert) => (
              <Collapse key={alert.alertId}>
                <Alert
                  severity={alert.severity}
                  sx={{ width: "100%", marginY: "0.2rem" }}
                  onClose={() => dispatch(removeAlertById(alert.alertId))}
                >
                  {alert.message}
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </Snackbar>
  );
};

import React, { useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  Box,
  Alert,
  Collapse,
  List,
} from "@mui/material";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";

const FRUITS = [
  "🍏 Apple",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥥 Coconut",
  "🍉 Watermelon",
];

interface RenderItemOptions {
  item: string;
  handleRemoveFruit: (item: string) => void;
}

export function TransitionGroupExample() {
  const [fruitsInBasket, setFruitsInBasket] = React.useState(
    FRUITS.slice(0, 3)
  );

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addFruitButton = (
    <Button
      variant="contained"
      disabled={fruitsInBasket.length >= FRUITS.length}
      onClick={handleAddFruit}
    >
      Add fruit to basket
    </Button>
  );

  return (
    <div>
      {addFruitButton}
      <Snackbar open={true}>
        <Box sx={{ mt: 1 }}>
          <List>
            <TransitionGroup>
              {fruitsInBasket.map((item) => (
                // <Collapse key={item}>
                //   {renderItem({ item, handleRemoveFruit })}
                // </Collapse>
                <Collapse key={item}>
                  <Alert
                    severity="success"
                    sx={{ width: "100%" }}
                    onClose={() => handleRemoveFruit(item)}
                  >
                    {item}
                  </Alert>
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
      </Snackbar>
    </div>
  );
}

export const MaptyProToast = () => {
  const [open, setOpen] = useState(true);

  const alertList: {
    severity?: AlertColor;
    message: string;
  }[] = [
    {
      severity: "error",
      message: "This is an error message!",
    },
    {
      severity: "warning",
      message: "This is a warning message!",
    },
    {
      severity: "info",
      message: "This is an information message!",
    },
    {
      severity: "success",
      message:
        "This is a success message! This is a success message!This is a success message!",
    },
  ];

  const [alertInBasket, setAlertInBasket] = React.useState(
    alertList.slice(0, 3)
  );

  const handleAddAlert = () => {
    const nextHiddenItem = alertList.find(
      (i) => !alertInBasket.map((item) => item.message).includes(i.message)
    );
    if (nextHiddenItem) {
      setAlertInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveAlert = (item: string) => {
    setAlertInBasket((prev) => [...prev.filter((i) => i.message !== item)]);
  };

  useEffect(() => {
    if (alertInBasket.length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [alertInBasket]);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleAddAlert}
        disabled={alertInBasket.length >= alertList.length}
      >
        Open success snackbar
      </Button>
      <Snackbar open={open}>
        <Box sx={{ mt: 1, width: "36rem" }}>
          <List>
            <TransitionGroup>
              {alertInBasket.map((item) => (
                <Collapse key={item.message}>
                  <Alert
                    severity={item.severity}
                    sx={{ width: "100%" }}
                    onClose={() => handleRemoveAlert(item.message)}
                  >
                    {item.message}
                  </Alert>
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
      </Snackbar>
    </>
  );
};

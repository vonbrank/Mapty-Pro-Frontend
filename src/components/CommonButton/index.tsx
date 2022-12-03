import { Button, styled } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

export const MaptyProButton = styled(Button)((theme) => ({
  textTransform: "capitalize",
  fontSize: "1.6rem",
}));

export const MaptyProLoadingButton = styled(LoadingButton)((theme) => ({
  textTransform: "capitalize",
  fontSize: "1.6rem",
}));

import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const CustomFooterLink = styled(Link)((theme) => ({
  textDecoration: "none",
  color: grey[500],
  fontSize: "1.6rem",
  padding: "1.2rem 3.6rem",
  transition: "color 0.3s",
  "&.active": {
    color: grey[900],
  },
}));

export { CustomFooterLink };

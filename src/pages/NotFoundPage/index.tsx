import React from "react";
import { Stack, Box, Typography, IconButton } from "@mui/material";
import { MaptyProButton } from "../../components/CommonButton";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { grey } from "@mui/material/colors";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Stack justifyContent={"center"} alignItems="center" height={"100vh"}>
      <Stack spacing={"2.4rem"} sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Oops!
        </Typography>
        <Typography variant="subtitle1">404 Not Found</Typography>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ color: grey[500] }}>
            Go Back to Home Page
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NotFoundPage;

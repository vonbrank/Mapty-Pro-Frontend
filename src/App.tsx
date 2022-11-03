import React from "react";
import logo from "./logo.svg";
import NavigationHeader from "./components/Navigation/NavigationHeader";
import NavigationFooter from "./components/Navigation/NavigationFooter";
import { Outlet } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Login />
      <Stack
        sx={{ minHeight: "100vh", zIndex: 0, overflow: "overlay", top: 0 }}
        justifyContent="space-between"
      >
        <NavigationHeader />
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: grey[50],
          }}
        >
          <Outlet />
        </Box>
        <NavigationFooter />
      </Stack>
    </>
  );
}

export default App;

import { Stack, TextField, Box } from "@mui/material";
import React, { useState } from "react";
import { MaptyProButton } from "../../../components/CommonButton";

const LoginForm = () => {
  const [fullNameOrEmail, setFullNameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      marginTop="7.2rem"
    >
      <form method="" action="">
        <Stack spacing="6.4rem">
          <TextField
            variant="standard"
            label="Full Name or Email"
            value={fullNameOrEmail}
            onChange={(e) => setFullNameOrEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MaptyProButton variant="contained">Login</MaptyProButton>
        </Stack>
      </form>
    </Box>
  );
};

export { LoginForm };
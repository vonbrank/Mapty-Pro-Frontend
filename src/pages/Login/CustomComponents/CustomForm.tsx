import { Stack, TextField, Box } from "@mui/material";
import React, { useState } from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { useAppDispatch } from "../../../Redux/hooks";
import { login, createAccount } from "../../../Redux/LoginSlice";

const LoginForm = () => {
  const [fullNameOrEmail, setFullNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    dispatch(
      login({
        username: fullNameOrEmail,
        email: fullNameOrEmail,
        password: password,
      })
    );
  };

  return (
    <Box marginTop="7.2rem">
      <form method="" action="" onSubmit={handleLogin}>
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
          <MaptyProButton type="submit" variant="contained">
            Login
          </MaptyProButton>
        </Stack>
      </form>
    </Box>
  );
};

const CreateAccountForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    dispatch(
      createAccount({ username: fullName, email: email, password: password })
    );
  };

  return (
    <Box marginTop="7.2rem">
      <form method="" action="" onSubmit={handleSubmit}>
        <Stack spacing="6.4rem">
          <TextField
            variant="standard"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="standard"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MaptyProButton type="submit" variant="contained">
            Create Account
          </MaptyProButton>
        </Stack>
      </form>
    </Box>
  );
};

export { LoginForm, CreateAccountForm };

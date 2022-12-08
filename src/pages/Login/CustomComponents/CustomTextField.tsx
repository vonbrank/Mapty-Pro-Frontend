import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

export const LoginTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input, & .MuiFormLabel-root.MuiInputLabel-root": {
    fontSize: "2rem",
  },
}));

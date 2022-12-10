import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { grey, red } from "@mui/material/colors";

export const LoginTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input, & .MuiFormLabel-root.MuiInputLabel-root": {
    fontSize: "2rem",
    "& .MuiInputLabel-asterisk": {
      color: red[500],
    },
  },
}));

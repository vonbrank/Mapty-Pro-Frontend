import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

export const MaptyProTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: grey[500],
    fontSize: "1.4rem",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    color: grey[900],
    "& fieldset": {
      borderColor: grey[700],
    },
    "&:hover > fieldset": {
      borderColor: grey[500],
    },
    "&.Mui-focused > fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

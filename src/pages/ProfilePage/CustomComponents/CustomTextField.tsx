import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

export const ProfileCardTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: grey[500],
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    // color: "#fff",
    "& .MuiInputBase-inputSizeSmall": {
      paddingTop: "0.65rem",
      paddingBottom: "0.65rem",
    },
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

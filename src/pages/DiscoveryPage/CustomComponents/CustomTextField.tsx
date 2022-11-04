import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";

export const CreateJourneyTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: grey[300],
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: grey[500],
    },
    "&:hover > fieldset": {
      borderColor: grey[300],
    },
    "&.Mui-focused > fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

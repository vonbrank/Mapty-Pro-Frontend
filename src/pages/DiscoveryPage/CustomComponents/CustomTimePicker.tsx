import React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { CreateJourneyTextField } from "./CustomTextField";
import { grey } from "@mui/material/colors";

export default function CreateJourneyPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Dayjs | null;
  onChange: (
    value: Dayjs | null,
    keyboardInputValue?: string | undefined
  ) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <CreateJourneyTextField
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                color: grey[300],
              },
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}

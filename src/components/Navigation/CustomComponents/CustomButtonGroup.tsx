import { useIntl } from "react-intl";
import { useAppDispatch } from "../../../Redux/hooks";
import { MaptyProButton } from "../../CommonButton";
import { openLoginPage, switchMode } from "../../../Redux/LoginSlice";
import { Stack, SxProps, StackProps } from "@mui/material";

export const CustomLoginButtonGroup = ({
  direction = "row",
  sx,
  onClick = () => {},
}: {
  direction?: "row" | "row-reverse" | "column" | "column-reverse" | undefined;
  sx?: SxProps;
  onClick?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  return (
    <Stack direction={direction} spacing={2} sx={sx}>
      <MaptyProButton
        onClick={() => {
          onClick();
          dispatch(openLoginPage(true));
          dispatch(switchMode(0));
        }}
        variant="outlined"
      >
        {intl.messages["navigation.login"] as string}
      </MaptyProButton>
      <MaptyProButton
        variant="contained"
        onClick={() => {
          onClick();
          dispatch(openLoginPage(true));
          dispatch(switchMode(1));
        }}
      >
        {intl.messages["navigation.signup"] as string}
      </MaptyProButton>
    </Stack>
  );
};

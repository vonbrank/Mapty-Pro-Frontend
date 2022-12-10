import {
  MaptyProModal,
  MaptyProModalProps,
} from "../../../components/CommonModal";
import { Box, ModalProps, Stack } from "@mui/material";
import { MaptyProButton } from "../../../components/CommonButton";
import { useState, useEffect } from "react";
import { delay } from "../../../Utils";
import { v4 as uuidv4 } from "uuid";
import Typography from "@mui/material/Typography";

export const RegisterNoticeModal = ({
  open,
  handleClose,
  handleAccept,
}: {
  open: boolean;
  handleClose: () => void;
  handleAccept: () => void;
}) => {
  const [acceptButtonEnableCountDown, setAcceptButtonEnableCountDown] =
    useState(5);

  return (
    <MaptyProModal
      title="Notice"
      open={open}
      handleClose={handleClose}
      sx={{ zIndex: 1302 }}
      boxProps={{
        sx: {
          flexGrow: 1,
        },
      }}
    >
      <Stack sx={{ height: "100%" }} justifyContent="space-between">
        <Stack
          justifyContent={"center"}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Typography sx={{ fontSize: "1.8rem" }}>
            {`由于开发周期原因，本项目后端数据为明文存储，缺乏安全保障，请勿在此使用您的常用密码；可以使用任何简单密码。若密码遗失，请与开发者联系 :)`}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent="flex-end"
          alignItems={"center"}
          spacing={"1.2rem"}
        >
          <MaptyProButton onClick={handleClose}>Cancel</MaptyProButton>
          <MaptyProButton
            variant="contained"
            onClick={() => {
              handleAccept();
              handleClose();
            }}
          >
            Accept
          </MaptyProButton>
        </Stack>
      </Stack>
    </MaptyProModal>
  );
};

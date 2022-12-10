import { Container, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { navigateTo } from "../../Redux/NavigationSlice";
import { CustomFooterLink } from "./CustomComponents/CustomLink";
import { useIntl } from "react-intl";

const NavigationFooter = () => {
  const dispatch = useAppDispatch();
  const linkInfoList = useAppSelector((state) => state.navigation.linkInfoList);
  const { formatMessage } = useIntl();

  return (
    <Paper elevation={2} sx={{ paddingY: "1.2rem", zIndex: 1300 }}>
      <Container>
        <Stack direction="row" justifyContent="center">
          {linkInfoList.map((linkInfo, index) => (
            <CustomFooterLink
              to={linkInfo.path}
              className={`${linkInfo.active ? "active" : ""}`}
              onClick={() => {
                dispatch(navigateTo({ index: index }));
              }}
              key={linkInfo.label}
              sx={{
                display: linkInfo.visible ? "inline" : "none",
              }}
            >
              {formatMessage({ id: linkInfo.label })}
            </CustomFooterLink>
          ))}
        </Stack>
        <Stack
          alignItems="center"
          sx={{
            color: grey[500],
            "& .MuiTypography-root": {
              fontSize: "1.2rem",
            },
          }}
        >
          <Typography>© Copyright 2022</Typography>
          <Typography sx={{ textAlign: "center" }}>
            {formatMessage({ id: "copyright.message" })}
          </Typography>
        </Stack>
      </Container>
    </Paper>
  );
};

export default NavigationFooter;

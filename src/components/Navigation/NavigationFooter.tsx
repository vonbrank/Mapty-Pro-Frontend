import { Container, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { navigateTo } from "../../Redux/NavigationSlice";
import { CustomFooterLink } from "./CustomComponents/CustomLink";

const NavigationFooter = () => {
  const dispatch = useAppDispatch();
  const linkInfoList = useAppSelector((state) => state.navigation.linkInfoList);

  return (
    <Paper sx={{ paddingY: "1.2rem" }}>
      <Container>
        <Stack direction="row" justifyContent="center">
          {linkInfoList.map((linkInfo, index) => (
            <CustomFooterLink
              to={linkInfo.path}
              className={`${linkInfo.active ? "active" : ""}`}
              onClick={() => {
                dispatch(navigateTo({ index: index }));
              }}
            >
              {linkInfo.label}
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
          <Typography>
            Use for the software engineering course in Harbin Institute of
            Technology
          </Typography>
        </Stack>
      </Container>
    </Paper>
  );
};

export default NavigationFooter;

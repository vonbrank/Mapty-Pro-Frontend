import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { Tabs, TabsProps, Tab } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { setTabVisible } from "../../../Redux/NavigationSlice";

const navigationTabProps = (index: number) => {
  return {
    id: `navigation-tab-${index}`,
    "aria-controls": `navigation-tabpanel-${index}`,
  };
};

export const CustomNavigationTab = (tabsProps: TabsProps) => {
  const { linkInfoList, activeIndex, currentUser } = useAppSelector(
    (state) => ({
      linkInfoList: state.navigation.linkInfoList,
      activeIndex: state.navigation.activeIndex,
      loginPageOpen: state.login.loginPage.loginPageOpen,
      currentUser: state.login.currentUser,
    })
  );

  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setTabVisible({
        label: "navigation.profile",
        newValue: currentUser !== undefined,
      })
    );
  }, [currentUser]);

  return (
    <Tabs
      value={linkInfoList[activeIndex].path}
      aria-label="Mapty-Pro-Navigation"
      {...tabsProps}
    >
      {linkInfoList
        .filter((linkInfo) => linkInfo.visible)
        .map((linkInfo, index) => (
          <Tab
            label={intl.messages[linkInfo.label] as string}
            value={linkInfo.path}
            key={linkInfo.label}
            {...navigationTabProps(index)}
            onClick={(e) => {
              navigate(linkInfo.path);
            }}
          />
        ))}
    </Tabs>
  );
};

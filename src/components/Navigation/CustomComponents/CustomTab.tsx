import React from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { Tabs, TabsProps, Tab } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

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

  return (
    <Tabs value={activeIndex} aria-label="Mapty-Pro-Navigation" {...tabsProps}>
      {linkInfoList.map((linkInfo, index) => (
        <Tab
          label={intl.messages[linkInfo.label] as string}
          key={linkInfo.label}
          {...navigationTabProps(index)}
          onClick={(e) => {
            navigate(linkInfo.path);
          }}
          sx={{
            display: linkInfo.visible ? "inline" : "none",
          }}
        />
      ))}
    </Tabs>
  );
};

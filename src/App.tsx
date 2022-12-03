import React, { useState } from "react";
import logo from "./logo.svg";
import NavigationHeader from "./components/Navigation/NavigationHeader";
import NavigationFooter from "./components/Navigation/NavigationFooter";
import { Outlet } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Login from "./pages/Login";
import { IntlProvider } from "react-intl";
import { LOCALES, messages, flattenMessages } from "./lang";
import { MaptyProToast } from "./components/CommonSnackBar";

function App() {
  const [locale, setLocale] = useState(LOCALES.CHINESE);
  const handleChangeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <>
      <IntlProvider
        messages={flattenMessages(messages[locale])}
        locale={locale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <Login />
        <Stack
          sx={{ height: "100vh", zIndex: 0, overflow: "overlay", top: 0 }}
          justifyContent="space-between"
        >
          <NavigationHeader handleChangeLocale={handleChangeLocale} />
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: grey[50],
            }}
          >
            <Outlet />
          </Box>
          <NavigationFooter />
          <MaptyProToast />
        </Stack>
      </IntlProvider>
    </>
  );
}

export default App;

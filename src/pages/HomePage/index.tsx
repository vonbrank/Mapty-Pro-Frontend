import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Sections/HeroSection";
import AsFeaturedInSection from "./Sections/AsFeaturedInSection";

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AsFeaturedInSection />
    </Box>
  );
};

export default HomePage;

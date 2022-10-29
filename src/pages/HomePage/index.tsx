import { Box } from "@mui/material";
import React from "react";
import HeroSection from "./Sections/HeroSection";
import AsFeaturedInSection from "./Sections/AsFeaturedInSection";
import FeatureSection from "./Sections/FeatureSection";
import RecommendationSection from "./Sections/RecommandationSection";

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AsFeaturedInSection />
      <FeatureSection />
      <RecommendationSection />
    </Box>
  );
};

export default HomePage;

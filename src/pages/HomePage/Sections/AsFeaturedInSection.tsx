import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const logoList: { label: string; url: string }[] = [
  {
    label: "React.js",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/react-js.webp",
  },
  {
    label: "Leaflet",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/Leaflet_logo.webp",
  },
  {
    label: "Pixso",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/pixso-logo.webp",
  },
  {
    label: "Unsplash",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/unsplash-logo.webp",
  },
  {
    label: "SpringBoot",
    url: "https://4.bp.blogspot.com/-ou-a_Aa1t7A/W6IhNc3Q0gI/AAAAAAAAD6Y/pwh44arKiuM_NBqB1H7Pz4-7QhUxAgZkACLcBGAs/s1600/spring-boot-logo.png",
  },
  {
    label: "TypeScript",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
  },
  {
    label: "MySQL",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/MySQL-Logo.webp",
  },

  {
    label: "Docker",
    url: "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/logo-icons/docker-logo.webp",
  },
];

const AsFeaturedInSection = () => {
  const minWidth768 = useMediaQuery("(min-width:768px)");
  const minWidth600 = useMediaQuery("(min-width:600px)");
  const minWidth375 = useMediaQuery("(min-width:375px)");

  const { formatMessage } = useIntl();

  const [logoChunks, setLogoChunks] = useState<
    { label: string; url: string }[][]
  >([]);
  const [chunkSize, setChunkSize] = useState(4);

  useEffect(() => {
    if (minWidth768) {
      setChunkSize(4);
    } else if (minWidth600) {
      setChunkSize(4);
    } else if (minWidth375) {
      setChunkSize(3);
    } else {
      setChunkSize(2);
    }
  }, [minWidth375, minWidth600, minWidth768]);

  useEffect(() => {
    let newLogoChunks: { label: string; url: string }[][] = [];
    for (let i = 0; i < logoList.length; i += chunkSize) {
      const chunk = logoList.slice(i, i + chunkSize);
      newLogoChunks = [...newLogoChunks, chunk];
    }
    setLogoChunks(newLogoChunks);
  }, [chunkSize]);

  return (
    <Box
      className="As-Feature-In-Section"
      sx={{
        marginY: "3.6rem",
        paddingY: "3.6rem",
        "& .As-Feature-In-Section": {
          "&__heading": {
            textAlign: "center",
            fontSize: "1.4rem",
            color: "#888",
            marginBottom: "1.6rem",
          },
          "&__logo": {
            height: minWidth768 ? "4.8rem" : "3.6rem",
            "&--height": {
              height: minWidth768 ? "9.6rem" : "7.2rem",
            },
          },
        },
      }}
    >
      <Container>
        <Typography className="As-Feature-In-Section__heading">
          {formatMessage({ id: "homePage.asFeaturedIn.heading" })}
        </Typography>
        <Stack spacing="5.6rem">
          {logoChunks.map((currentRow, index) => (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing="5.6rem"
              key={index}
            >
              {currentRow.map((currentItem, index) => (
                <img
                  className={`As-Feature-In-Section__logo ${
                    ["Pixso", "MySQL", "TypeScript", "SpringBoot"].includes(
                      currentItem.label
                    )
                      ? "As-Feature-In-Section__logo--height"
                      : ""
                  }`}
                  src={currentItem.url}
                  alt={currentItem.label}
                  key={index}
                />
              ))}
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default AsFeaturedInSection;

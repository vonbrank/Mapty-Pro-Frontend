import React, { useState } from "react";
import { Paper, Box, Stack, Typography } from "@mui/material";
import { MaptyProButton } from "../CommonButton";
import { MaptyProModal } from "../CommonModal";
import { Waypoint } from "../../Redux/JourneySlice";
import { MapExample } from "../LeafletMap";
import { JourneyWaypointList } from "../../pages/DiscoveryPage/CustomComponents/Waypoint";
import { grey } from "@mui/material/colors";
import { ReactComponent as ProfilePhotoPlaceholder } from "../../assets/ProfilePhotoPlaceholder.svg";
import { current } from "@reduxjs/toolkit";
import { useAppSelector } from "../../Redux/hooks";
import { MaptyProTextField } from "../CommonTextField";

interface JourneyBriefInfo {
  title: string;
  content: string;
  imgSrc: string;
}

const JourneyRecommendationList: JourneyBriefInfo[] = [
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-8.webp",
  },
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-9.webp",
  },
  {
    title: "Surrounding of Harbin Institute of Technology",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean luctus ex vel est interdum congue. Aliquam posuere scelerisque risus, vel pretium mauris commodo ut. Vivamus congue interdum faucibus.",
    imgSrc:
      "https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20221024-HIT-Service-Software-Engineering/journey-cards/nat-10.webp",
  },
];

const JourneyCommentExamples: {
  commentId: string;
  username: string;
  commentContent: string;
  commentTime: string;
}[] = [
  {
    username: "RAmBARtI",
    commentContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. ",
    commentTime: "2018-04-04T16:00:00.000Z",
    commentId: "1",
  },
  {
    username: "XTIoNorE",
    commentContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. ",
    commentTime: "2018-04-04T16:00:00.000Z",
    commentId: "2",
  },
  {
    username: "iSChLiOu",
    commentContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse egestas turpis et mi mollis malesuada. Quisque sed eleifend mauris. Aenean nec fermentum risus. Aenean nec fermentum risus. Aenean nec fermentum risus. ",
    commentTime: "2018-04-04T16:00:00.000Z",
    commentId: "3",
  },
];

type JourneyCardInfo = JourneyBriefInfo & { waypoints?: Waypoint[] };

const JourneyCard = ({
  title,
  content,
  imgSrc,
  waypoints = [],
}: JourneyCardInfo) => {
  const { currentUser } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
  }));
  const [openMore, setOpenMore] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "1.6rem",
        "&:hover": {
          "& .Recommendation-Card__image-box img": {
            transform: "scale(1.2)",
          },
        },
        "& .Recommendation-Card": {
          "&__image-box": {
            height: "12.8rem",
            width: "12.8rem",
            flexShrink: 0,
            borderRadius: "100rem",
            overflow: "hidden",
            "& img": {
              height: "100%",
              width: "100%",
              transition: "all 0.5s",
              objectFit: "cover",
            },
          },
          "&__title": {
            fontSize: "2rem",
            fontWeight: "600",
            color: "#4c4c4c",
          },
          "&__content": {
            marginTop: "1.2rem",
            marginBottom: "1.8rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing="3.2rem">
        <Box className="Recommendation-Card__image-box">
          <img src={imgSrc} alt={title} />
        </Box>
        <Box>
          <Typography className="Recommendation-Card__title">
            {title}
          </Typography>
          <Typography className="Recommendation-Card__content">
            {content}
          </Typography>
          <MaptyProButton variant="outlined" onClick={() => setOpenMore(true)}>
            More
          </MaptyProButton>
        </Box>
      </Stack>
      <MaptyProModal
        title={title}
        open={openMore}
        handleClose={() => setOpenMore(false)}
      >
        <Box marginTop={"1.2rem"}>
          <Box sx={{ height: "36rem" }}>
            <MapExample />
          </Box>
          <Typography
            sx={{
              marginY: "1.6rem",
              fontSize: "1.8rem",
              color: grey[900],
            }}
          >
            {content}
          </Typography>
          <Box>
            <JourneyWaypointList
              waypointList={waypoints.map((waypoint) => ({
                label: waypoint.label,
                time: waypoint.time,
              }))}
              sx={{
                "& .MuiTypography-root": {
                  color: grey[800],
                },
              }}
            />
          </Box>
          <Stack
            spacing="1.6rem"
            sx={{ paddingX: "1.6rem", marginBottom: "1.6rem" }}
          >
            <Paper
              sx={{
                padding: "1.6rem",
              }}
            >
              <Stack direction={"row"} spacing="1.6rem" alignItems={"center"}>
                <Box
                  sx={{
                    width: "6.4rem",
                    height: "6.4rem",
                    padding: "1.2rem",
                    border: "2px solid rgb(175, 175, 175)",
                    borderRadius: "12.8rem",
                    flexShrink: 0,
                  }}
                >
                  <ProfilePhotoPlaceholder
                    style={{ height: "100%", width: "100%" }}
                  />
                </Box>
                <Stack sx={{ flexGrow: 1 }} spacing={"1.2rem"}>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {currentUser?.username || "undefined username"}
                  </Typography>
                  <Box>
                    <MaptyProTextField multiline rows={3} fullWidth />
                  </Box>
                  <Stack direction={"row"} justifyContent="flex-end">
                    <MaptyProButton variant="contained" size="small">
                      Commemt
                    </MaptyProButton>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
            {JourneyCommentExamples.map((journeyComment) => {
              return (
                <Paper
                  sx={{
                    padding: "1.6rem",
                  }}
                  key={journeyComment.commentId}
                >
                  <Stack
                    direction={"row"}
                    spacing="1.6rem"
                    alignItems={"center"}
                  >
                    <Box
                      sx={{
                        width: "6.4rem",
                        height: "6.4rem",
                        padding: "1.2rem",
                        border: "2px solid rgb(175, 175, 175)",
                        borderRadius: "12.8rem",
                        flexShrink: 0,
                      }}
                    >
                      <ProfilePhotoPlaceholder
                        style={{ height: "100%", width: "100%" }}
                      />
                    </Box>
                    <Stack spacing={"1.2rem"}>
                      <Typography sx={{ fontSize: "2rem" }}>
                        {journeyComment.username}
                      </Typography>
                      <Box sx={{ height: "7.2rem", overflow: "auto" }}>
                        <Typography sx={{ color: grey[700] }}>
                          {journeyComment.commentContent}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </MaptyProModal>
    </Paper>
  );
};
export { JourneyCard, JourneyRecommendationList };
export type { JourneyBriefInfo };

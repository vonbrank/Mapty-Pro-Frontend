import { Box, Container, Stack, Typography, Card, Avatar } from "@mui/material";
import { ReactComponent as ProfilePhotoPlaceholder } from "../../../assets/ProfilePhotoPlaceholder.svg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const CustomContributorCard = () => {
  return (
    <Card
      elevation={6}
      sx={{
        padding: "2.4rem",
        transition: "all 0.5s",
        "&:hover": {
          transform: "scale(1.05) translateY(-0.5rem)",
          boxShadow:
            "0px 5px 6px -3px rgb(0 0 0 / 20%), 0px 9px 12px 1px rgb(0 0 0 / 14%), 0px 3px 16px 2px rgb(0 0 0 / 12%)",
        },
      }}
    >
      <Stack direction={"row"} alignItems="center" spacing={"2.4rem"}>
        <Avatar
          alt="Profile Photo"
          sx={{
            height: "6rem",
            width: "6rem",
          }}
        >
          <PersonOutlineIcon />
        </Avatar>
        <Typography sx={{ fontSize: "1.8rem" }}>Name Placeholder</Typography>
      </Stack>
    </Card>
  );
};

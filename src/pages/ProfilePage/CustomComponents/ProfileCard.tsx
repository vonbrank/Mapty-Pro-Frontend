import { Paper, Stack, Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { MaptyProButton } from "../../../components/CommonButton";
import { ReactComponent as ProfilePhotoPlaceholder } from "../../../assets/ProfilePhotoPlaceholder.svg";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { MaptyProTextField } from "../../../components/CommonTextField";
import { ProfileCardTextField } from "./CustomTextField";
import { MaptyProModal } from "../../../components/CommonModal";
import { showFeatureDevelopingText } from "../../../Utils";
import { resetPassword, updateUserInfo } from "../../../Redux/LoginSlice";
import { showTemporaryToastText } from "../../../Redux/ToastSlice";

const ProfileCard = ({ className }: { className?: string }) => {
  const minWidth900 = useMediaQuery("(min-width:900px)");
  const minWidth600 = useMediaQuery("(min-width:600px)");
  const { currentUser, journeyDataList } = useAppSelector((state) => ({
    currentUser: state.login.currentUser,
    journeyDataList: state.journey.personnal.jourenyList,
  }));
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEdit = () => {
    setEditUsername(currentUser?.username || "");
    setEditEmail(currentUser?.email || "");
    setEditMode(true);
  };

  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const handleUpdateUserInfo = async () => {
    if (currentUser === undefined) return;

    dispatch(
      updateUserInfo(
        {
          username: currentUser.username,
          password: currentUser.password,
        },
        {
          username: editUsername,
          email: editEmail,
        }
      )
    );

    setEditMode(false);
  };

  const handleResetPassword = async () => {
    if (currentUser === undefined) return;

    if (newPassword !== confirmNewPassword) {
      dispatch(
        showTemporaryToastText({
          severity: "warning",
          message: "两次输入的密码不一致",
        })
      );
      return;
    }

    dispatch(
      resetPassword(
        {
          username: currentUser.username,
          password: currentUser.password,
        },
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      )
    );

    setResetPasswordOpen(false);
  };

  return (
    <Paper
      className={`Profile-Card ${className ? className : ""}`}
      elevation={2}
      sx={{
        width: minWidth900 ? "36rem" : "100%",
        padding: "3.2rem",
        "& .Profile-Card": {
          "&__profile-photo-box": {
            padding: "3.2rem",
            border: "0.4rem solid rgb(175, 175, 175)",
            borderRadius: "12.8rem",
          },
          "&__journey-number": {
            width: "12.8rem",
            "&-num": {
              fontSize: "3.6rem",
            },
            "&-text": {
              fontSize: "2.4rem",
            },
          },
          "&__button-group": {
            width: "100%",
            "& button": {
              fontSize: "1.8rem",
            },
          },
          "&__full-name": {
            fontSize: "2.4rem",
          },
          "&__email": {
            fontSize: "2.4rem",
            color: "#808080",
          },
        },
      }}
    >
      <Stack className="Profile-Card-root" alignItems="center" spacing="2.4rem">
        <Box className="Profile-Card__profile-photo-box">
          <ProfilePhotoPlaceholder />
        </Box>
        {!editMode ? (
          <>
            <Typography className="Profile-Card__full-name">
              {currentUser?.username}
            </Typography>
            <Typography className="Profile-Card__email">
              {currentUser?.email
                ? currentUser?.email
                : "Want to bind your email addres? Click here."}
            </Typography>
          </>
        ) : (
          <>
            <ProfileCardTextField
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              label="Username"
              size="small"
              fullWidth
            />
            <ProfileCardTextField
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              label="Email"
              size="small"
              fullWidth
            />
          </>
        )}

        <Stack
          justifyContent="space-between"
          alignItems="center"
          className="Profile-Card__journey-number"
        >
          <Typography className="Profile-Card__journey-number-num">
            {journeyDataList.length}
          </Typography>
          <Typography className="Profile-Card__journey-number-text">
            Journeys
          </Typography>
        </Stack>
        <Stack spacing="1.2rem" className="Profile-Card__button-group">
          {!editMode ? (
            <MaptyProButton variant="contained" fullWidth onClick={handleEdit}>
              Edit
            </MaptyProButton>
          ) : (
            <>
              <Stack direction={"row"} spacing="1.8rem">
                <MaptyProButton
                  variant="contained"
                  fullWidth
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </MaptyProButton>
                <MaptyProButton
                  variant="contained"
                  fullWidth
                  onClick={handleUpdateUserInfo}
                >
                  Update
                </MaptyProButton>
              </Stack>
            </>
          )}
          <MaptyProButton
            variant="contained"
            onClick={() => setResetPasswordOpen(true)}
            fullWidth
          >
            Reset Password
          </MaptyProButton>
        </Stack>
      </Stack>
      <MaptyProModal
        open={resetPasswordOpen}
        handleClose={() => setResetPasswordOpen(false)}
        title="Reset your password"
        boxProps={{
          sx: {
            height: "auto",
          },
        }}
      >
        <Stack spacing="1.6rem" marginTop="2.4rem">
          <MaptyProTextField
            type="password"
            value={oldPassword}
            label="Old password"
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
          />
          <MaptyProTextField
            type="password"
            value={newPassword}
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
          <MaptyProTextField
            type="password"
            value={confirmNewPassword}
            label="Confirm new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
          />
          <Stack direction={"row"} justifyContent="flex-end" spacing="1.6rem">
            <MaptyProButton onClick={() => setResetPasswordOpen(false)}>
              Cancel
            </MaptyProButton>
            <MaptyProButton variant="contained" onClick={handleResetPassword}>
              Update
            </MaptyProButton>
          </Stack>
        </Stack>
      </MaptyProModal>
    </Paper>
  );
};

export default ProfileCard;

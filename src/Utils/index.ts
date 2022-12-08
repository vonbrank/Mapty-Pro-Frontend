import { useAppDispatch } from "../Redux/hooks";
import { AppDispatch } from "../Redux/store";
import { showTemporaryToastText } from "../Redux/ToastSlice";

export function delay(t: number, v?: number) {
  return new Promise((resolve) => setTimeout(resolve, t, v));
}

export const showFeatureDevelopingText = (dispatch: AppDispatch) => {
  dispatch(
    showTemporaryToastText({
      severity: "warning",
      message: "This feature has not been implemented yet. Coming soon!",
    })
  );
};

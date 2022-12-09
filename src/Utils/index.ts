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

export const journeyListToUniqueJourneyDataList = (
  jourenyList: {
    id: Number;
    title: string;
    description: string;
    waypoints: {
      label: string;
      time: string;
      coordinate: string;
    }[];
  }[]
) => {
  return jourenyList.map((jouorney) => {
    return {
      journeyId: `${jouorney.id}`,
      title: jouorney.title,
      description: jouorney.description,
      waypointList: jouorney.waypoints.map((waypoint) => {
        return {
          label: waypoint.label,
          time: waypoint.time,
          coordinate: {
            lat: +waypoint.coordinate
              .substring(1, waypoint.coordinate.length - 1)
              .split(", ")[0],
            lng: +waypoint.coordinate
              .substring(1, waypoint.coordinate.length - 1)
              .split(", ")[1],
          },
        };
      }),
    };
  });
};

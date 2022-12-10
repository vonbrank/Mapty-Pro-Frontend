import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  journeyListToUniqueJourneyDataList,
  showFeatureDevelopingText,
} from "../Utils";
import Axios from "../Utils/Axios";
import { AppDispatch } from "./store";
import { showTemporaryToastText } from "./ToastSlice";

export interface JourneyData {
  title: string;
  description: string;
  waypointList: {
    label: string;
    time: string;
    coordinate?: {
      lat: number;
      lng: number;
    };
  }[];
}

export interface Waypoint {
  label: string;
  time: string;
  coordinate?: {
    lat: number;
    lng: number;
  };
}

export interface UniqueJourneyData extends JourneyData {
  journeyId: string;
}

interface JourneyState {
  personnal: {
    jourenyList: UniqueJourneyData[];
  };
  system: {
    recommendJourneySeed: number;
    recommendJourneyList: UniqueJourneyData[];
  };
  newSelectCoordinate?: {
    lng: number;
    lat: number;
  };
  waypointsDisplayOnMap: {
    label: string;
    time: string;
    coordinate: {
      lat: number;
      lng: number;
    };
  }[];
}

const initialState: JourneyState = {
  personnal: {
    jourenyList: [],
  },
  system: {
    recommendJourneySeed: 0,
    recommendJourneyList: [],
  },
  waypointsDisplayOnMap: [],
};

export const journeySlice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    handleSelectNewCoordinate: (
      state,
      action: PayloadAction<
        | {
            lng: number;
            lat: number;
          }
        | undefined
      >
    ) => {
      state.newSelectCoordinate = action.payload;
    },
    setWaypoinsDisplayOnMap: (
      state,
      action: PayloadAction<
        {
          label: string;
          time: string;
          coordinate?: {
            lat: number;
            lng: number;
          };
        }[]
      >
    ) => {
      state.waypointsDisplayOnMap = action.payload
        .filter((waypoint) => waypoint.coordinate !== undefined)
        .map(
          (waypoint) =>
            waypoint as {
              label: string;
              time: string;
              coordinate: {
                lat: number;
                lng: number;
              };
            }
        );
    },
    addPersonalJourney: (state, action: PayloadAction<JourneyData>) => {
      state.personnal.jourenyList = [
        {
          journeyId: uuidv4(),
          ...action.payload,
        },
        ...state.personnal.jourenyList,
      ];
    },
    setPersonalJourney: (state, action: PayloadAction<UniqueJourneyData[]>) => {
      state.personnal.jourenyList = action.payload;
    },
    setRecommendJourney: (
      state,
      action: PayloadAction<UniqueJourneyData[]>
    ) => {
      state.system.recommendJourneyList = action.payload;
    },
    setRecommendJourneySeed: (state, action: PayloadAction<number>) => {
      state.system.recommendJourneySeed = action.payload;
    },
    getDataFromLocalStorage: (state) => {
      const personalJourneyListJson = localStorage.getItem(
        "personalJourneyList"
      );
      if (!personalJourneyListJson) return;
      const personalJourneyList: UniqueJourneyData[] | null = JSON.parse(
        personalJourneyListJson
      );
      if (!personalJourneyList) return;
      state.personnal.jourenyList = personalJourneyList;
    },
    removePersonalJourney: (
      state,
      action: PayloadAction<{ journeyId: string }>
    ) => {
      state.personnal.jourenyList = state.personnal.jourenyList.filter(
        (journey) => journey.journeyId !== action.payload.journeyId
      );
      localStorage.setItem(
        "personalJourneyList",
        JSON.stringify(state.personnal.jourenyList)
      );
    },
  },
});

export const getUserJourneyData = (accountdata: {
  username: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const axiosRes = await Axios.get("/journey/getByUser", {
        headers: {
          username: accountdata.username,
          password: accountdata.password,
        },
      });
      const res: {
        code: Number;
        description: string;
        timestamp: string;
        data?: {
          id: Number;
          title: string;
          description: string;
          waypoints: {
            label: string;
            time: string;
            coordinate: string;
          }[];
        }[];
      } = axiosRes.data;
      if (res.code === 200 && res.data !== undefined) {
        const jourenyList = res.data;
        dispatch(
          setPersonalJourney(journeyListToUniqueJourneyDataList(jourenyList))
        );
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
    }
  };
};

export const createNewJourney = (
  accountdata: {
    username: string;
    password: string;
  },
  newJourney: JourneyData
) => {
  const dataToPost: {
    title: string;
    description: string;
    usrId: Number;
    waypoints: {
      label: string;
      time: string;
      coordinate: string;
    }[];
  } = {
    title: newJourney.title,
    description: newJourney.description,
    usrId: 0,
    waypoints: newJourney.waypointList.map((waypoint) => ({
      label: waypoint.label,
      time: waypoint.time,
      coordinate: `(${waypoint.coordinate?.lat || 0}, ${
        waypoint.coordinate?.lng || 0
      })`,
    })),
  };

  return async (dispatch: AppDispatch) => {
    try {
      const axiosRes = await Axios.post("/journey/create", dataToPost, {
        headers: {
          username: accountdata.username,
          password: accountdata.password,
        },
      });
      const res: {
        code: Number;
        description: string;
        timestamp: string;
        data?: any;
      } = axiosRes.data;
      if (res.code === 200) {
        dispatch(getUserJourneyData(accountdata));
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
    }
  };
};

export const getPublicRandomJourneyData = (
  randomSeed: number,
  count: number
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const axiosRes = await Axios.get("/journey/getBySeed", {
        params: {
          seed: randomSeed,
          count: count,
        },
      });
      const res: {
        code: Number;
        description: string;
        timestamp: string;
        data?: {
          id: Number;
          title: string;
          description: string;
          waypoints: {
            label: string;
            time: string;
            coordinate: string;
          }[];
        }[];
      } = axiosRes.data;
      if (res.code === 200 && res.data !== undefined) {
        const jourenyList = res.data;
        dispatch(
          setRecommendJourney(journeyListToUniqueJourneyDataList(jourenyList))
        );
      }
    } catch (error) {
      dispatch(
        showTemporaryToastText({ severity: "error", message: `${error}` })
      );
    }
  };
};

export const {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
  getDataFromLocalStorage,
  removePersonalJourney,
  setPersonalJourney,
  setRecommendJourney,
  setRecommendJourneySeed,
} = journeySlice.actions;

export default journeySlice.reducer;

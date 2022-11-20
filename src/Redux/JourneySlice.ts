import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Axios from "../Utils/Axios";
import { AppDispatch } from "./store";

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
        .filter((waypoint) => waypoint.coordinate != undefined)
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
      localStorage.setItem(
        "personalJourneyList",
        JSON.stringify(state.personnal.jourenyList)
      );
    },
    setPersonalJourney: (state, action: PayloadAction<UniqueJourneyData[]>) => {
      state.personnal.jourenyList = action.payload;
      localStorage.setItem(
        "personalJourneyList",
        JSON.stringify(state.personnal.jourenyList)
      );
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
        setPersonalJourney(
          jourenyList.map((jouorney) => {
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
          })
        )
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
} = journeySlice.actions;

export default journeySlice.reducer;

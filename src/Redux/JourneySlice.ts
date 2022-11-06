import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

export const {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
  getDataFromLocalStorage,
  removePersonalJourney,
} = journeySlice.actions;

export default journeySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface JourneyState {
  personnal: {
    jourenyList: JourneyData[];
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
        action.payload,
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
      const personalJourneyList: JourneyData[] | null = JSON.parse(
        personalJourneyListJson
      );
      if (!personalJourneyList) return;
      state.personnal.jourenyList = personalJourneyList;
    },
  },
});

export const {
  handleSelectNewCoordinate,
  setWaypoinsDisplayOnMap,
  addPersonalJourney,
  getDataFromLocalStorage,
} = journeySlice.actions;

export default journeySlice.reducer;

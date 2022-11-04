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
    jourenyList: [
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
      {
        title: "Harbin Institute of Technology surrounding",
        description: "what a nice place",
        waypointList: [
          {
            label: "ZhengXin building",
            time: "08:00",
          },
          {
            label: "ZhengXin building",
            time: "12:00",
          },
          {
            label: "ZhengXin building",
            time: "16:00",
          },
          {
            label: "ZhengXin building",
            time: "19:00",
          },
        ],
      },
    ],
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
          coordinate: {
            lat: number;
            lng: number;
          };
        }[]
      >
    ) => {
      state.waypointsDisplayOnMap = action.payload;
    },
  },
});

export const { handleSelectNewCoordinate, setWaypoinsDisplayOnMap } = journeySlice.actions;

export default journeySlice.reducer;

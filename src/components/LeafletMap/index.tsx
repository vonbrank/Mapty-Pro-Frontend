import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  useMapEvent,
  FeatureGroup,
} from "react-leaflet";
import * as L from "leaflet";
import { Box, useMediaQuery } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useEffect } from "react";
import {
  LatLng,
  LayerEventHandlerFn,
  LeafletMouseEvent,
  LayerEvent,
} from "leaflet";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { handleSelectNewCoordinate } from "../../Redux/JourneySlice";
import { WaypointPopUpCard } from "../../pages/DiscoveryPage/CustomComponents/Waypoint";

const MapExample = ({ sx }: { sx?: SxProps<Theme> }) => {
  function MapExampleOperationHook() {
    const map = useMap();
    useEffect(() => {
      map.attributionControl.setPosition("bottomleft");
      map.zoomControl.remove();
    }, []);
    return <></>;
  }
  return (
    <Box
      className="LeafletMap-root"
      sx={{
        width: "100%",
        height: "100%",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
        },
        ...sx,
      }}
    >
      <MapContainer
        center={[45.743641, 126.644855]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <MapExampleOperationHook />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker position={[45.744337, 126.632191]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

const LocationMarker = ({
  handleClickMap,
}: {
  handleClickMap: (e: LeafletMouseEvent) => void;
}) => {
  useMapEvent<"click">("click", handleClickMap);

  return <></>;
};

const MapDiscoveryOperationHook = () => {
  const { waypointsDisplayOnMap } = useAppSelector((state) => ({
    waypointsDisplayOnMap: state.journey.waypointsDisplayOnMap,
  }));
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.enable();
  }, []);
  useEffect(() => {
    if (waypointsDisplayOnMap.length === 0) return;
    let group = new L.FeatureGroup();
    waypointsDisplayOnMap.forEach((waypoint) => {
      L.marker([waypoint.coordinate.lat, waypoint.coordinate.lng]).addTo(group);
    });
    map.fitBounds(group.getBounds());
  }, [waypointsDisplayOnMap]);

  return <></>;
};

const MapDiscovery = () => {
  const { waypointsDisplayOnMap } = useAppSelector((state) => ({
    waypointsDisplayOnMap: state.journey.waypointsDisplayOnMap,
  }));
  const dispatch = useAppDispatch();

  const handleClickMap = (e: LeafletMouseEvent) => {
    console.log(`[location marker] event latlng = `, e.latlng);
    dispatch(
      handleSelectNewCoordinate({ lat: e.latlng.lat, lng: e.latlng.lng })
    );
  };

  const minWidth768 = useMediaQuery("(min-width:768px)");

  return (
    <Box
      height={minWidth768 ? "calc(100vh - 8rem)" : "calc(60vh - 8rem)"}
      className="LeafletMap-root"
      sx={{
        width: "100%",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <MapContainer
        center={[45.743641, 126.664855]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
        />
        <MapDiscoveryOperationHook />
        <LocationMarker handleClickMap={handleClickMap} />
        <FeatureGroup>
          {waypointsDisplayOnMap.map((waypoint, index) => (
            <Marker
              position={[waypoint.coordinate.lat, waypoint.coordinate.lng]}
              key={index}
            >
              <Popup>
                <WaypointPopUpCard
                  label={waypoint.label}
                  time={waypoint.time}
                />
              </Popup>
            </Marker>
          ))}
        </FeatureGroup>
      </MapContainer>
    </Box>
  );
};

function JourneyCardMapOperationHook({
  waypointsToDisplay,
}: {
  waypointsToDisplay: {
    lat: number;
    lng: number;
  }[];
}) {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPosition("bottomleft");
    map.zoomControl.remove();
    map.dragging.disable();
  }, []);

  if (waypointsToDisplay.length !== 0) {
    let group = new L.FeatureGroup();
    waypointsToDisplay.forEach((waypoint) => {
      L.marker([waypoint.lat, waypoint.lng]).addTo(group);
    });
    map.fitBounds(group.getBounds(), { padding: [0.5, 0.5] });
  }

  return <></>;
}

const JourneyCardMap = ({
  waypointsToDisplay,
}: {
  waypointsToDisplay: {
    lat?: number;
    lng?: number;
  }[];
}) => {
  const waypoinsToRender = waypointsToDisplay.filter(
    (waypoint) => waypoint.lat && waypoint.lng
  ) as {
    lat: number;
    lng: number;
  }[];

  return (
    <Box
      className="LeafletMap-root"
      sx={{
        width: "100%",
        height: "100%",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      <MapContainer
        center={[45.743641, 126.644855]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <JourneyCardMapOperationHook waypointsToDisplay={waypoinsToRender} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
        />
        <FeatureGroup>
          {waypoinsToRender
            .filter((waypoint) => waypoint.lat && waypoint.lng)
            .map((waypoint, index) => (
              <Marker position={[waypoint.lat, waypoint.lng]} key={index} />
            ))}
        </FeatureGroup>
      </MapContainer>
    </Box>
  );
};

export { MapExample, MapDiscovery, JourneyCardMap };

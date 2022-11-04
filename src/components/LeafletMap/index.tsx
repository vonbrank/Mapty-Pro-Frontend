import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
  useMapEvent,
} from "react-leaflet";
import { Box } from "@mui/material";
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
// import { tileLayer } from "leaflet.chinatmsproviders";

function MapExampleOperationHook() {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPosition("bottomleft");
    map.zoomControl.remove();
  }, []);
  return <></>;
}

const MapExample = ({ sx }: { sx?: SxProps<Theme> }) => {
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

const MapDiscoveryOperationHook = () => {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.enable();
    // tileLayer
    //   .chinaProvider("TianDiTu.Normal.Map", { maxZoom: 18, minZoom: 5 })
    //   .addTo(map);
  }, []);
  return <></>;
};

const LocationMarker = ({
  handleClickMap,
}: {
  handleClickMap: (e: LeafletMouseEvent) => void;
}) => {
  useMapEvent<"click">("click", handleClickMap);

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

  return (
    <Box
      height="calc(100vh - 8rem)"
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
        {waypointsDisplayOnMap.map((waypoint, index) => (
          <Marker
            position={[waypoint.coordinate.lat, waypoint.coordinate.lng]}
            key={index}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export { MapExample, MapDiscovery };

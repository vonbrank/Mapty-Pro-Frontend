import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useEffect } from "react";

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
        center={[45.743641, 126.664855]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MapExampleOperationHook />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[45.743337, 126.631191]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

function MapDiscoveryOperationHook() {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.enable();
  }, []);
  return <></>;
}

const MapDiscovery = () => {
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
        <MapDiscoveryOperationHook />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[45.743337, 126.631191]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export { MapExample, MapDiscovery };

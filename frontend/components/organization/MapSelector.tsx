"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, Marker as LeafletMarker, LeafletEvent, LatLng } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface MapSelectorProps {
  latitude: number;
  longitude: number;
  setCoordinates: (lat: number, lng: number) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ latitude, longitude, setCoordinates }) => {
  const [position, setPosition] = useState<[number, number]>([latitude, longitude]);

  if (typeof window !== "undefined") {
    const L = require("leaflet");
    const markerIcon2x = require("leaflet/dist/images/marker-icon-2x.png");
    const markerIcon = require("leaflet/dist/images/marker-icon.png");
    const markerShadow = require("leaflet/dist/images/marker-shadow.png");

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }

  const handleDragEnd = (e: LeafletEvent) => {
    const marker = e.target as LeafletMarker;
    const newPos: LatLng = marker.getLatLng();
    setPosition([newPos.lat, newPos.lng]);
    setCoordinates(newPos.lat, newPos.lng);
  };

  return (
    <div>
      <MapContainer
        center={position as [number, number]}
        zoom={13}
        className="h-64 w-full rounded border"
        scrollWheelZoom={false}
        dragging={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position as [number, number]}
          draggable={true}
          eventHandlers={{ dragend: handleDragEnd }}
        >
          <Popup>Drag me to set the job location!</Popup>
        </Marker>
      </MapContainer>

      <p className="text-sm text-gray-600 mt-2">
        <strong>Coordinates:</strong> {position[0].toFixed(6)}, {position[1].toFixed(6)}
      </p>
    </div>
  );
};

export default MapSelector;

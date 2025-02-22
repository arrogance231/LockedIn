"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Posting {
  id: string;
  jobTitle: string;
  jobPoster: string;
  jobDescription: string;
  volunteers: Array<{ id: string; name: string }>;
  latitude: number;
  longitude: number;
  location: string;
  photos: string[];
}

export default function PostingPage() {
  const [posting, setPosting] = useState<Posting | null>(null);

  useEffect(() => {
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

    // MOCK ONLY (ito yung ico-configure with back-end data from "posts" database)
    const mockPosting: Posting = {
      id: "1", // postId
      jobTitle: "Flood Relief Volunteer Needed",
      jobPoster: "Posted by: Arjhine Ty, FEU Institute of Technology",
      jobDescription:
        "We are seeking dedicated volunteers to help with flood relief efforts. Responsibilities include distributing supplies, assisting residents, and coordinating with local authorities.",
      volunteers: [
        { id: "v1", name: "Jhezra Tolentino" },
        { id: "v2", name: "Matthew Viacrusis" },
        { id: "v3", name: "Darren Antonio" },
      ],
      latitude: 14.6041,
      longitude: 120.9886,
      location: "Manila City, Metro Manila",
      photos: [
        "/images/photo1.jpg",
        "/images/photo2.jpg",
        "/images/photo3.jpg",
        "/images/photo4.jpg",
        "/images/photo5.jpg",
      ],
    };

    setPosting(mockPosting);
  }, []);

  if (!posting) {
    return <div>Loading posting data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* UPPER: job info */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>{posting.jobTitle}</h1>
          <h3 style={{ margin: 0 }}>{posting.jobPoster}</h3>
        </div>
        <p style={{ marginTop: "20px" }}>{posting.jobDescription}</p>
      </section>

      {/* MIDDLE */}
      <section style={{ marginBottom: "40px", display: "flex" }}>
        {/* LEFT: volunteers */}
        <div
          style={{
            flex: 1,
            paddingRight: "20px",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2>Volunteers ({posting.volunteers.length})</h2>
          <ul>
            {posting.volunteers.map((vol) => (
              <li key={vol.id}>
                {vol.name} (ID: {vol.id})
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: map and location */}
        <div style={{ flex: 1, paddingLeft: "20px" }}>
          <MapContainer
            center={[posting.latitude, posting.longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[posting.latitude, posting.longitude]}>
              <Popup>{posting.location}</Popup>
            </Marker>
          </MapContainer>
          <p style={{ marginTop: "10px" }}>
            <strong>Location:</strong> {posting.location}
          </p>
        </div>
      </section>

      {/* LOWER: photos */}
      <section>
        <h2>Photos</h2>
        <div
          style={{
            display: "grid",
            gridTemplateAreas: `
              "photo1 photo1"
              "photo2 photo3"
              "photo4 photo5"
            `,
            gridTemplateColumns: "1fr 1fr",
            gridGap: "10px",
          }}
        >
          {posting.photos.map((photo, index) => {
            let gridArea = "";
            switch (index) {
              case 0:
                gridArea = "photo1";
                break;
              case 1:
                gridArea = "photo2";
                break;
              case 2:
                gridArea = "photo3";
                break;
              case 3:
                gridArea = "photo4";
                break;
              case 4:
                gridArea = "photo5";
                break;
              default:
                gridArea = "";
            }
            return (
              <img
                key={index}
                src={photo}
                alt={`Job photo ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  gridArea,
                }}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

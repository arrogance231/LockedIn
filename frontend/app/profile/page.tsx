"use client";

import React from "react";

export default function ProfilePage() {
  // MOCK DATA MUNA
  const volunteerData = {
    profilePicUrl: "https://edith.feutech.edu.ph/briefcase/assets/images/avatars/T2023/MD-T202311411.png",
    fullName: "Jhezra Tolentino", // BLANK IF ORG
    organizationName: "", // BLANK IF VOLMAN
    joinDate: "2004-09-04",
    volunteerWorkCount: 5757,

    contactNumber: "+1 234-567-890",
    contactEmail: "jhezra@bading.com",
    location: "Sampaloc, Manila",
    
    // EVENT JSON
    events: [
      {
        id: 1,
        title: "Flood Relief Operation",
        date: "2025-05-15",
      },
      {
        id: 2,
        title: "Coastal Cleanup Drive",
        date: "2025-06-01",
      },
    ],

    // BADGES?
    badges: [
      {
        id: 1,
        badgeName: "Flood Relief Hero",
        dateEarned: "2025-05-20",
      },
      {
        id: 2,
        badgeName: "Beach Defender",
        dateEarned: "2025-06-03",
      },
    ],
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT HALF */}
      <div
        style={{
          flex: 1,
          borderRight: "1px solid #ddd",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* PROF PIC */}
        <img
          src={volunteerData.profilePicUrl}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        {/* NAME */}
        <h1 style={{ margin: "0 0 10px 0" }}>
          {volunteerData.fullName || volunteerData.organizationName}
        </h1>
        {/* JOIN DATE */}
        <p style={{ margin: "5px 0" }}>
          <strong>Join Date:</strong> {volunteerData.joinDate}
        </p>
        {/* VOL WORK COMPLETED */}
        <p style={{ margin: "5px 0" }}>
          <strong>Volunteer Work Completed:</strong>{" "}
          {volunteerData.volunteerWorkCount}
        </p>
      </div>

      {/* RIGHT HALF */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ADD INFO */}
        <div style={{ flex: 1, padding: "20px" }}>
          <h2 style={{ marginTop: 0 }}>Additional Information</h2>
          <p>
            <strong>Contact Number:</strong> {volunteerData.contactNumber}
          </p>
          <p>
            <strong>Email:</strong> {volunteerData.contactEmail}
          </p>
          <p>
            <strong>Location:</strong> {volunteerData.location}
          </p>

          <h3>Current Volunteer Events</h3>
          {volunteerData.events.length > 0 ? (
            <ul>
              {volunteerData.events.map((event) => (
                <li key={event.id}>
                  {event.title} <br />
                  <small>(Date: {event.date})</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No current events listed.</p>
          )}
        </div>

        {/* REWARDS */}
        <div
          style={{
            flex: 1,
            borderTop: "1px solid #ddd",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Rewards & Badges</h2>
          {volunteerData.badges.length > 0 ? (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {volunteerData.badges.map((badge) => (
                <li key={badge.id} style={{ marginBottom: "10px" }}>
                  <strong>{badge.badgeName}</strong> <br />
                  <small>Earned on: {badge.dateEarned}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No badges earned yet. Start volunteering to earn badges!</p>
          )}
        </div>
      </div>
    </div>
  );
}

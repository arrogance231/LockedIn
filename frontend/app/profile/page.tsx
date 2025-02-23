"use client";

import React, { useEffect, useState } from "react";
import pb from "../lib/pocketbase_init"; // Ensure your PocketBase client is properly initialized
import Image from "next/image";

// Define interfaces for the volunteer data
interface VolunteerHistory {
  id: number;
  title: string;
  date: string;
}

interface CurrentEvent {
  id: number;
  title: string;
  date: string;
}

interface Badge {
  id: number;
  badgeName: string;
  dateEarned: string;
}

interface VolunteerData {
  profilePicUrl?: string;
  fullName?: string;
  joinDate: string;
  volunteerHoursCount: number;
  contactEmail: string;
  location: string;
  history: VolunteerHistory[];
  currentEvents: CurrentEvent[];
  badges: Badge[];
  rewardPoints: number;
}

// Fetch volunteer data from PocketBase
const getVolunteerData = async (volunteerId: string): Promise<VolunteerData | null> => {
  try {
    const volunteer = await pb.collection("volunteers").getOne(volunteerId);
    
    return {
      profilePicUrl: volunteer.vol_profile_picture
        ? `${pb}/api/files/volunteers/${volunteer.id}/${volunteer.vol_profile_picture}`
        : "https://via.placeholder.com/150",
      fullName: volunteer.vol_name,
      joinDate: volunteer.created,
      volunteerHoursCount: volunteer.reward_points || 0,
      contactEmail: volunteer.email,
      location: volunteer.location,
      history: JSON.parse(volunteer.completed_events || "[]"),
      currentEvents: JSON.parse(volunteer.pending_events || "[]"),
      badges: [], // Add a real implementation if your schema supports badges
      rewardPoints: volunteer.reward_points,
    };
  } catch (error) {
    console.error("Error fetching volunteer data:", error);
    return null;
  }
};

// Date formatter
const formatDate = (dateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
};

// Profile section component
const ProfileSection: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="flex flex-col items-center p-6 border-r border-gray-300 w-80 text-center">
    <Image
      src={data.profilePicUrl || "https://via.placeholder.com/150"}
      alt="Profile"
      width={144}
      height={144}
      className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg"
    />
    <h1 className="text-2xl font-bold break-words">{data.fullName}</h1>
    <p className="text-gray-600">Joined: {formatDate(data.joinDate)}</p>
    <p className="text-gray-600">Volunteer Hours Completed: {data.volunteerHoursCount}</p>

    {/* Volunteer impact */}
    <h3 className="mt-4 text-lg font-semibold">Reward Points</h3>
    <p className="text-xl font-bold text-blue-600">{data.rewardPoints} pts</p>
  </div>
);

// Info section component
const InfoSection: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">Contact Info</h2>
    <p><strong>Email:</strong> {data.contactEmail}</p>
    <p><strong>Location:</strong> {data.location}</p>

    <h3 className="mt-4 text-lg font-semibold">Completed Events</h3>
    {data.history.length > 0 ? (
      <ul className="list-disc ml-5">
        {data.history.map((history: VolunteerHistory, index) => (
          <li key={index} className="mt-1">
            <strong>{history.title}</strong> <br />
            <small className="text-gray-500">({formatDate(history.date)})</small>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No completed events listed.</p>
    )}
  </div>
);

// Event Tracker Component
const EventTracker: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="p-6 bg-gray-100 border-t border-gray-300">
    <h2 className="text-xl font-semibold">Ongoing & Upcoming Events</h2>
    {data.currentEvents.length > 0 ? (
      <ul className="list-disc ml-5">
        {data.currentEvents.map((event: CurrentEvent, index) => (
          <li key={index} className="mt-1">
            <strong>{event.title}</strong> <br />
            <small className="text-gray-500">({formatDate(event.date)})</small>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No upcoming events listed.</p>
    )}
  </div>
);

// Main profile page component
export default function ProfilePage() {
  const [volunteerData, setVolunteerData] = useState<VolunteerData | null>(null);

  useEffect(() => {
    // Change this ID to dynamically fetch the logged-in user
    const volunteerId = "test"; // Replace with the actual user ID
    getVolunteerData(volunteerId).then((data) => {
      if (data) setVolunteerData(data);
    });
  }, []);

  if (!volunteerData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section - profile */}
      <ProfileSection data={volunteerData} />

      {/* Right section - additional info & event tracker */}
      <div className="flex-1 flex flex-col">
        <InfoSection data={volunteerData} />
        <EventTracker data={volunteerData} />
      </div>
    </div>
  );
}

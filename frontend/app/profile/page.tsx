"use client";

import React from "react";
import jsPDF from "jspdf";

// Define interfaces for data
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
  organizationName?: string;
  joinDate: string;
  volunteerHoursCount: number;
  contactNumber: string;
  contactEmail: string;
  location: string;
  bio?: string;
  history: VolunteerHistory[];
  currentEvents: CurrentEvent[];
  badges: Badge[];
  impactMetrics: {
    peopleHelped: number;
    projectsCompleted: number;
    communitiesImpacted: number;
  };
}

// Mock API response (replace with actual API data in the future)
const volunteerData: VolunteerData = {
  profilePicUrl: "https://edith.feutech.edu.ph/briefcase/assets/images/avatars/T2023/MD-T202311411.png",
  fullName: "Jhezra Tolentino",
  organizationName: "",
  joinDate: "2004-09-04",
  volunteerHoursCount: 20000,
  contactNumber: "+1 234-567-890",
  contactEmail: "jhezra@bading.com",
  location: "Sampaloc, Manila",
  bio: "It's time to cook...",
  history: [
    { id: 1, title: "Flood Relief Operation", date: "2025-05-15" },
    { id: 2, title: "Coastal Cleanup Drive", date: "2025-06-01" },
  ],
  currentEvents: [
    { id: 1, title: "Food Drive for the Homeless", date: "2025-07-10" },
    { id: 2, title: "Tree Planting Initiative", date: "2025-08-05" },
  ],
  badges: [
    { id: 1, badgeName: "Flood Relief Hero", dateEarned: "2025-05-20" },
    { id: 2, badgeName: "Beach Defender", dateEarned: "2025-06-03" },
  ],
  impactMetrics: {
    peopleHelped: 1500,
    projectsCompleted: 25,
    communitiesImpacted: 10,
  },
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

// Function to get the next milestone goal
const getNextGoal = (hours: number): number => {
  const milestones = [1000, 5000, 10000, 20000];
  return milestones.find(milestone => milestone > hours) || 20000;
};

// Function to generate a certification PDF
const generateCertificate = (hours: string, title: string) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Certificate of Achievement", 20, 30);
  doc.setFontSize(16);
  doc.text(`Presented to ${volunteerData.fullName}`, 20, 50);
  doc.text(`For completing ${hours} hours and earning the "${title}" title!`, 20, 70);
  doc.text(`Joined on: ${formatDate(volunteerData.joinDate)}`, 20, 90);
  doc.save(`${title}-certificate.pdf`);
};

// Profile section component
const ProfileSection: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="flex flex-col items-center p-6 border-r border-gray-300 w-80 text-center">
    <img
      src={data.profilePicUrl || "https://via.placeholder.com/150"}
      alt="Profile"
      className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg"
    />
    <h1 className="text-2xl font-bold break-words">{data.fullName || data.organizationName}</h1>
    <p className="text-gray-600">Joined: {formatDate(data.joinDate)}</p>
    <p className="text-gray-600">Volunteer Hours Completed: {data.volunteerHoursCount}</p>
    
    {/* Profile bio */}
    {data.bio && (
      <p className="mt-2 text-gray-700 italic px-4">"{data.bio}"</p>
    )}

    {/* Volunteer hours progress bar */}
    {data.volunteerHoursCount < 20000 && (
      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${(data.volunteerHoursCount / getNextGoal(data.volunteerHoursCount)) * 100}%` }}
        ></div>
      </div>
    )}
    <p className="text-sm text-gray-600 mt-2 break-words">
      {data.volunteerHoursCount >= 20000
        ? "🎉 Congratulations! You have reached the Platinum Volunteer milestone! 🎉"
        : `Current Goal: ${getNextGoal(data.volunteerHoursCount)} Hours`}
    </p>

    {/* Volunteer impact metrics */}
    <div className="mt-4 text-sm text-gray-700">
      <h3 className="text-lg font-semibold">Impact Metrics</h3>
      <p><strong>People Helped:</strong> {data.impactMetrics.peopleHelped}</p>
      <p><strong>Projects Completed:</strong> {data.impactMetrics.projectsCompleted}</p>
      <p><strong>Communities Impacted:</strong> {data.impactMetrics.communitiesImpacted}</p>
    </div>

    {/* Milestone achievements */}
    <h3 className="mt-4 text-lg font-semibold">Milestone Achievements</h3>
    <ul className="list-disc ml-5 text-left">
      <li className={data.volunteerHoursCount >= 1000 ? "text-green-600" : "text-gray-400"}>1,000 Hours - Bronze Volunteer</li>
      <li className={data.volunteerHoursCount >= 5000 ? "text-green-600" : "text-gray-400"}>5,000 Hours - Silver Volunteer</li>
      <li className={data.volunteerHoursCount >= 10000 ? "text-green-600" : "text-gray-400"}>10,000 Hours - Gold Volunteer</li>
      <li className={data.volunteerHoursCount >= 20000 ? "text-green-600" : "text-gray-400"}>20,000 Hours - Platinum Volunteer</li>
    </ul>

    {/* Certification download buttons */}
    {data.volunteerHoursCount >= 1000 && (
      <button onClick={() => generateCertificate("1000", "Bronze Volunteer")} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Download Bronze Certificate
      </button>
    )}
    {data.volunteerHoursCount >= 5000 && (
      <button onClick={() => generateCertificate("5000", "Silver Volunteer")} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Download Silver Certificate
      </button>
    )}
    {data.volunteerHoursCount >= 10000 && (
      <button onClick={() => generateCertificate("10000", "Gold Volunteer")} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Download Gold Certificate
      </button>
    )}
    {data.volunteerHoursCount >= 20000 && (
      <button onClick={() => generateCertificate("20000", "Platinum Volunteer")} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Download Platinum Certificate
      </button>
    )}
  </div>
);

// Info section component
const InfoSection: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">Additional Information</h2>
    <p><strong>Contact Number:</strong> {data.contactNumber}</p>
    <p><strong>Email:</strong> {data.contactEmail}</p>
    <p><strong>Location:</strong> {data.location}</p>

    <h3 className="mt-4 text-lg font-semibold">Most Recent Volunteer Events</h3>
    {data.history.length > 0 ? (
      <ul className="list-disc ml-5">
        {data.history.map((history: VolunteerHistory) => (
          <li key={history.id} className="mt-1">
            <strong>{history.title}</strong> <br />
            <small className="text-gray-500">({formatDate(history.date)})</small>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No current events listed.</p>
    )}
  </div>
);

// Event Tracker Component
const EventTracker: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="p-6 bg-gray-100 border-t border-gray-300">
    <h2 className="text-xl font-semibold">Ongoing & Upcoming Events</h2>
    {data.currentEvents.length > 0 ? (
      <ul className="list-disc ml-5">
        {data.currentEvents.map((event: CurrentEvent) => (
          <li key={event.id} className="mt-1">
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

// Badges section component
const BadgesSection: React.FC<{ data: VolunteerData }> = ({ data }) => (
  <div className="p-6 bg-gray-100 border-t border-gray-300">
    <h2 className="text-xl font-semibold">Rewards & Badges</h2>
    {data.badges.length > 0 ? (
      <div className="grid grid-cols-2 gap-4 mt-2">
        {data.badges.map((badge: Badge) => (
          <div key={badge.id} className="p-3 bg-white shadow rounded-lg text-center">
            <strong>{badge.badgeName}</strong> <br />
            <small className="text-gray-500">Earned on: {formatDate(badge.dateEarned)}</small>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No badges earned yet. Start volunteering to earn badges!</p>
    )}
  </div>
);

// Main profile page component
export default function ProfilePage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section - profile */}
      <ProfileSection data={volunteerData} />

      {/* Right section - additional info & badges */}
      <div className="flex-1 flex flex-col">
        <InfoSection data={volunteerData} />
        <EventTracker data={volunteerData} />
        <BadgesSection data={volunteerData} />
      </div>
    </div>
  );
}

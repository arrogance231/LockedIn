"use client";

import React, { useState } from "react";
import { useAuth } from "../../components/organization/AuthContext";
import OrganizationProfileCard from "../../components/organization/OrganizationProfileCard";
import OrganizationInfoSection from "../../components/organization/OrganizationInfoSection";
import OrganizationEventTracker from "../../components/organization/OrganizationEventTracker";
import OrganizationRecognition from "../../components/organization/OrganizationRecognition";

const mockOrganization = {
  profilePicUrl: "https://i.pinimg.com/736x/38/b7/b4/38b7b4eca7d1c393ca761c9f99c036d7.jpg",
  name: "Helping Hands",
  joinDate: "2015-06-20",
  website: "https://helpinghands.org",
  contactEmail: "contact@helpinghands.org",
  contactNumber: "+1 234-567-890",
  location: "New York, USA",
  bio: "Dedicated to community service and volunteer engagement.",
  hostedEvents: [
    { id: 1, title: "Beach Cleanup", date: "2025-05-15", volunteers: ["Alice Johnson", "Michael Smith", "Emma Wilson", "David Brown", "Chris Miller"] },
    { id: 2, title: "Food Drive", date: "2025-06-01", volunteers: ["Sophia Davis", "Daniel Lee", "Olivia Martinez", "Liam Anderson", "Emily Taylor"] },
  ],
  upcomingEvents: [
    { id: 1, title: "Tree Planting Initiative", date: "2025-07-10", volunteers: ["Ethan White", "Ava Moore", "James Harris", "Isabella Thomas", "Benjamin Clark"] },
    { id: 2, title: "Mental Health Awareness Walk", date: "2025-08-05", volunteers: ["Charlotte Walker", "Henry Hall", "Amelia Scott", "Mason Green", "Lucas Adams"] },
  ],
  impactMetrics: {
    volunteersEngaged: 5000,
    projectsHosted: 120,
    communitiesImpacted: 45,
  },
  recognitions: [
    { id: 1, title: "Best Community Service Award", dateEarned: "2023-05-20" },
    { id: 2, title: "Green Initiative Champion", dateEarned: "2024-06-03" },
  ],
};

const OrganizationPage = () => {
  const { user, loginAsOrg, logout } = useAuth();
  const isOrg = user?.role === "organization";

  // Editable fields state
  const [bio, setBio] = useState(mockOrganization.bio);
  const [contactInfo, setContactInfo] = useState({
    contactNumber: mockOrganization.contactNumber,
    contactEmail: mockOrganization.contactEmail,
    location: mockOrganization.location,
    website: mockOrganization.website,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    setIsEditing(false);
    mockOrganization.bio = bio;
    mockOrganization.contactNumber = contactInfo.contactNumber;
    mockOrganization.contactEmail = contactInfo.contactEmail;
    mockOrganization.location = contactInfo.location;
    mockOrganization.website = contactInfo.website;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section - Profile Overview with Impact Metrics */}
      <OrganizationProfileCard org={{ ...mockOrganization, bio }} />

      {/* Right section - Additional Info & Features */}
      <div className="flex-1 flex flex-col">
        {/* Contact Info Section (Not Editable Here) */}
        <OrganizationInfoSection org={mockOrganization} />

        {/* Event Tracker for Upcoming Events */}
        <OrganizationEventTracker events={mockOrganization.upcomingEvents} />

        {/* Recognitions */}
        <OrganizationRecognition recognitions={mockOrganization.recognitions} />

        {/* Editable Fields (Now at the Bottom) */}
        {isOrg && (
          <div className="p-6 bg-gray-100 border-t border-gray-300">
            {isEditing ? (
              <>
                <h2 className="text-xl font-semibold mb-2">Edit Organization Info</h2>

                {/* Bio Editing */}
                <label className="block font-semibold mt-4">Bio:</label>
                <textarea
                  className="border p-2 w-full rounded"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                {/* Contact Info Editing */}
                <label className="block font-semibold mt-4">Phone:</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={contactInfo.contactNumber}
                  onChange={(e) => setContactInfo({ ...contactInfo, contactNumber: e.target.value })}
                />

                <label className="block font-semibold mt-4">Email:</label>
                <input
                  type="email"
                  className="border p-2 w-full rounded"
                  value={contactInfo.contactEmail}
                  onChange={(e) => setContactInfo({ ...contactInfo, contactEmail: e.target.value })}
                />

                <label className="block font-semibold mt-4">Location:</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={contactInfo.location}
                  onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                />

                <label className="block font-semibold mt-4">Website:</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={contactInfo.website}
                  onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                />

                {/* Save Button */}
                <button
                  onClick={handleSaveChanges}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Edit Organization Info
              </button>
            )}
          </div>
        )}

        {/* Logout/Login Options */}
        {isOrg ? (
          <div className="p-6">
            <button
              onClick={logout}
              className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-center p-6">
            <button
              onClick={loginAsOrg}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Login as Organization
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationPage;

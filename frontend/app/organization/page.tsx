"use client";

import React, { useState } from "react";
import { useAuth } from "../../components/organization/AuthContext";
import OrganizationProfileCard from "../../components/organization/OrganizationProfileCard";
import OrganizationInfoSection from "../../components/organization/OrganizationInfoSection";
import OrganizationEventTracker from "../../components/organization/OrganizationEventTracker";
import OrganizationRecognition from "../../components/organization/OrganizationRecognition";
import NavBar from "@/components/NavBar";
// ---- MOCK ORGANIZATION DATA ----
const mockOrganization = {
  profilePicUrl:
    "https://i.pinimg.com/736x/38/b7/b4/38b7b4eca7d1c393ca761c9f99c036d7.jpg",
  name: "Helping Hands",
  joinDate: "2015-06-20",
  website: "https://helpinghands.org",
  contactEmail: "contact@helpinghands.org",
  contactNumber: "+1 234-567-890",
  location: "New York, USA",
  bio: "Dedicated to community service and volunteer engagement.",
  hostedEvents: [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2025-05-15",
      volunteers: [
        "Alice Johnson",
        "Michael Smith",
        "Emma Wilson",
        "David Brown",
        "Chris Miller",
      ],
    },
    {
      id: 2,
      title: "Food Drive",
      date: "2025-06-01",
      volunteers: [
        "Sophia Davis",
        "Daniel Lee",
        "Olivia Martinez",
        "Liam Anderson",
        "Emily Taylor",
      ],
    },
  ],
  upcomingEvents: [
    {
      id: 1,
      title: "Tree Planting Initiative",
      date: "2025-07-10",
      volunteers: [
        "Ethan White",
        "Ava Moore",
        "James Harris",
        "Isabella Thomas",
        "Benjamin Clark",
      ],
    },
    {
      id: 2,
      title: "Mental Health Awareness Walk",
      date: "2025-08-05",
      volunteers: [
        "Charlotte Walker",
        "Henry Hall",
        "Amelia Scott",
        "Mason Green",
        "Lucas Adams",
      ],
    },
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

// ---- CHATBOT COMPONENT ----
const OrganizationChatbot = () => {
  const [suggestions, setSuggestions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);

  // Build the prompt using mockOrganization info
  const prompt = `Based on the following organization details:
Name: ${mockOrganization.name}
Bio: ${mockOrganization.bio}
Website: ${mockOrganization.website}
Contact: ${mockOrganization.contactEmail}, ${mockOrganization.contactNumber}
Location: ${mockOrganization.location}
Hosted Events: ${mockOrganization.hostedEvents
    .map((event) => event.title)
    .join(", ")}
Upcoming Events: ${mockOrganization.upcomingEvents
    .map((event) => event.title)
    .join(", ")}
Impact Metrics: Volunteers Engaged - ${
    mockOrganization.impactMetrics.volunteersEngaged
  }, Projects Hosted - ${
    mockOrganization.impactMetrics.projectsHosted
  }, Communities Impacted - ${
    mockOrganization.impactMetrics.communitiesImpacted
  }

Please provide actionable suggestions for increasing volunteer engagement and overall organizational impact.`;

  const getSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions("");
    try {
      const response = await fetch("https://api.together.xyz/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer tgp_v1_V__tpSLPndLsa1_TGK-00V9dddS7S65oKcIZvzocHmA`,
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3", // Using Deepseek as the model
          prompt,
          max_tokens: 150,
          temperature: 0.7,
          top_p: 1.0,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      const botReply = data?.choices?.[0]?.text ?? "(No suggestions)";
      setSuggestions(botReply.trim());
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 border rounded-lg border-gray-300 bg-black text-white overflow-y-auto transition-all duration-300 ${
        expanded ? "w-96 h-96" : "w-12 h-12"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded ? (
        <>
          <h2 className="text-xl font-bold mb-4">Chatbot Suggestions</h2>
          <p className="mb-2 text-sm text-gray-300">
            Get suggestions based on your organization's profile.
          </p>
          <button
            onClick={getSuggestions}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Suggestions"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {suggestions && (
            <div className="p-4 bg-white text-black rounded shadow">
              <h3 className="font-semibold mb-2">Suggestions:</h3>
              <p className="text-gray-800 whitespace-pre-line">{suggestions}</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-white">Chat</span>
        </div>
      )}
    </div>
  );
};

// ---- ORGANIZATION PAGE COMPONENT ----
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
    <div className="relative h-screen">
      <NavBar />
      {/* Left section - Profile Overview with Impact Metrics */}
      <div className="w-full overflow-y-auto">
        <div className="flex">
          <div className="w-full p-4">
            <OrganizationProfileCard org={{ ...mockOrganization, bio }} />
          </div>
        </div>

        {/* Additional Organization Sections */}
        <OrganizationInfoSection org={mockOrganization} />
        <OrganizationEventTracker events={mockOrganization.upcomingEvents} />
        <OrganizationRecognition recognitions={mockOrganization.recognitions} />

        {/* Editable Fields */}
        {isOrg && (
          <div className="p-6 bg-gray-100 border-t border-gray-300">
            {isEditing ? (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  Edit Organization Info
                </h2>

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
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      contactNumber: e.target.value,
                    })
                  }
                />

                <label className="block font-semibold mt-4">Email:</label>
                <input
                  type="email"
                  className="border p-2 w-full rounded"
                  value={contactInfo.contactEmail}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      contactEmail: e.target.value,
                    })
                  }
                />

                <label className="block font-semibold mt-4">Location:</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={contactInfo.location}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      location: e.target.value,
                    })
                  }
                />

                <label className="block font-semibold mt-4">Website:</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={contactInfo.website}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      website: e.target.value,
                    })
                  }
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

      {/* Chatbot Panel */}
      <div className="rounded-xl">
        <OrganizationChatbot />
      </div>
    </div>
  );
};

export default OrganizationPage;

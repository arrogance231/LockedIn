"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/organization/AuthContext";

interface Event {
  id: number;
  title: string;
  date: string;
  volunteers: string[];
}

interface Posting {
  id: string;
  jobTitle: string;
  jobPoster: string;
  jobDescription: string;
  latitude: number;
  longitude: number;
  location: string;
  photos: string[];
}

// Type Guard to check if an item is an Event
const isEvent = (item: Event | Posting): item is Event => {
  return (item as Event).volunteers !== undefined;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OrganizationEventTracker: React.FC<{ events: Event[] }> = ({ events }) => {
  const { user } = useAuth();
  const isOrg = user?.role === "organization";
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [postings, setPostings] = useState<Posting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPosting, setNewPosting] = useState<Posting>({
    id: "",
    jobTitle: "",
    jobPoster: "",
    jobDescription: "",
    latitude: 0,
    longitude: 0,
    location: "",
    photos: [],
  });

  const toggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleCreatePosting = () => {
    if (!newPosting.jobTitle || !newPosting.location) return;

    setPostings([...postings, { ...newPosting, id: Date.now().toString() }]);
    setIsModalOpen(false);
    setNewPosting({
      id: "",
      jobTitle: "",
      jobPoster: "",
      jobDescription: "",
      latitude: 0,
      longitude: 0,
      location: "",
      photos: [],
    });
  };

  return (
    <div className="p-6 bg-gray-100 border-t border-gray-300 relative">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        Upcoming Events
        {isOrg && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-2xl bg-blue-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-blue-600"
          >
            +
          </button>
        )}
      </h2>

      {events.length > 0 || postings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...events, ...postings].map((item) => {
            const isExpanded = expandedEvent === item.id;

            return (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold">
                  {isEvent(item) ? item.title : item.jobTitle}
                </h3>
                <p className="text-gray-500">
                  {isEvent(item) ? formatDate(item.date) : item.location}
                </p>

                {/* Volunteer List (Only for Events) */}
                {isEvent(item) && (
                  <div className="mt-3">
                    <h4 className="font-medium text-gray-700">Volunteers:</h4>
                    <ul className="text-gray-600">
                      {(isExpanded || !isOrg
                        ? item.volunteers
                        : item.volunteers.slice(0, 4)
                      ).map((volunteer: string, index: number) => (
                        <li key={index}>• {volunteer}</li>
                      ))}
                    </ul>

                    {/* Expand/Collapse button (Only for Logged-in Organizations) */}
                    {item.volunteers.length > 4 && (
                      isOrg ? (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-blue-500 mt-1 underline"
                        >
                          {isExpanded ? "Show less" : `...${item.volunteers.length - 4} more (see all)`}
                        </button>
                      ) : (
                        <p className="mt-1 italic text-gray-500">...{item.volunteers.length - 4} more</p>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming events listed.</p>
      )}

      {/* Create Posting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-3">Create a Job Posting</h2>

            <label className="block font-semibold">Job Title</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-2"
              value={newPosting.jobTitle}
              onChange={(e) => setNewPosting({ ...newPosting, jobTitle: e.target.value })}
            />

            <label className="block font-semibold">Job Poster</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-2"
              value={newPosting.jobPoster}
              onChange={(e) => setNewPosting({ ...newPosting, jobPoster: e.target.value })}
            />

            <label className="block font-semibold">Description</label>
            <textarea
              className="border p-2 w-full rounded mb-2"
              value={newPosting.jobDescription}
              onChange={(e) => setNewPosting({ ...newPosting, jobDescription: e.target.value })}
            />

            <label className="block font-semibold">Location</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-2"
              value={newPosting.location}
              onChange={(e) => setNewPosting({ ...newPosting, location: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePosting}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationEventTracker;

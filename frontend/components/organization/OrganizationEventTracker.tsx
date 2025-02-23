"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/organization/AuthContext";
import dynamic from "next/dynamic";
import CreateJobPosting from "./CreateJobPosting";

interface Event {
  id: string;
  title: string;
  date: string;
  location?: string; // Location is optional for existing events
  volunteers: string[];
}

interface Posting {
  id: string;
  jobTitle: string;
  jobDescription: string;
  date: string;
  latitude: number;
  longitude: number;
  location: string;
  photos: string[];
}

// Type Guard: Check if the item is an Event
const isEvent = (item: Event | Posting): item is Event => {
  return "volunteers" in item;
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

  const toggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleCreatePosting = (newPosting: Posting) => {
    setPostings([...postings, newPosting]);
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
                <p className="text-gray-500">{formatDate(item.date)}</p>

                {/* Display Location */}
                <p className="text-gray-600 text-sm mt-1">
                  <strong>📍 Location:</strong>{" "}
                  {isEvent(item) ? item.location ?? "Not specified" : item.location}
                </p>

                {/* Volunteer List for Events */}
                {isEvent(item) && (
                  <div className="mt-3">
                    <h4 className="font-medium text-gray-700">Volunteers:</h4>
                    <ul className="text-gray-600">
                      {(isExpanded || !isOrg
                        ? item.volunteers
                        : item.volunteers.slice(0, 4)
                      ).map((volunteer, index) => (
                        <li key={index}>• {volunteer}</li>
                      ))}
                    </ul>

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

      {isModalOpen && (
        <CreateJobPosting onClose={() => setIsModalOpen(false)} onCreate={handleCreatePosting} />
      )}
    </div>
  );
};

export default OrganizationEventTracker;

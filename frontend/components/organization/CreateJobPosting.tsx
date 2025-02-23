"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const MapSelector = dynamic(() => import("./MapSelector"), { ssr: false });

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

interface CreateJobPostingProps {
  onClose: () => void;
  onCreate: (posting: Posting) => void;
}

const CreateJobPosting: React.FC<CreateJobPostingProps> = ({ onClose, onCreate }) => {
  const [newPosting, setNewPosting] = useState<Posting>({
    id: "",
    jobTitle: "",
    jobDescription: "",
    date: "",
    latitude: 14.6041,
    longitude: 120.9886,
    location: "",
    photos: [],
  });

  const handleCreate = () => {
    if (!newPosting.jobTitle || !newPosting.date) {
      alert("Please fill in all required fields.");
      return;
    }

    onCreate({ ...newPosting, id: Date.now().toString() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-96 rounded-lg shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Create a Job Posting</h2>
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <label className="block font-semibold">Job Title</label>
          <input
            type="text"
            className="border p-2 w-full rounded mb-2"
            value={newPosting.jobTitle}
            onChange={(e) => setNewPosting({ ...newPosting, jobTitle: e.target.value })}
          />

          <label className="block font-semibold">Description</label>
          <textarea
            className="border p-2 w-full rounded mb-2"
            value={newPosting.jobDescription}
            onChange={(e) => setNewPosting({ ...newPosting, jobDescription: e.target.value })}
          />

          <label className="block font-semibold">Event Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded mb-2"
            value={newPosting.date}
            onChange={(e) => setNewPosting({ ...newPosting, date: e.target.value })}
          />

          <label className="block font-semibold">Location (Drag Marker to Set)</label>
          <MapSelector
            latitude={newPosting.latitude}
            longitude={newPosting.longitude}
            setCoordinates={(lat, lng) =>
              setNewPosting({ ...newPosting, latitude: lat, longitude: lng })
            }
          />

          <label className="block font-semibold mt-4">Location Name (Optional)</label>
          <input
            type="text"
            className="border p-2 w-full rounded mb-2"
            placeholder="Enter location name"
            value={newPosting.location}
            onChange={(e) => setNewPosting({ ...newPosting, location: e.target.value })}
          />

          <label className="block font-semibold mt-4">Photo URLs (one per line)</label>
          <textarea
            className="border p-2 w-full rounded mb-2"
            value={newPosting.photos.join("\n")}
            onChange={(e) => setNewPosting({ ...newPosting, photos: e.target.value.split("\n") })}
          />
        </div>

        <div className="p-4 border-t flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Cancel
          </button>
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPosting;

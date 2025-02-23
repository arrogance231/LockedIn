"use client";

import React from "react";

interface Recognition {
  id: number;
  title: string;
  dateEarned: string;
}

const OrganizationRecognition = ({ recognitions }: { recognitions: Recognition[] }) => (
  <div className="p-6 bg-gray-100 border-t border-gray-300">
    <h2 className="text-xl font-semibold">Awards & Recognitions</h2>
    {recognitions.length > 0 ? (
      <div className="grid grid-cols-2 gap-4 mt-2">
        {recognitions.map((recognition) => (
          <div key={recognition.id} className="p-3 bg-white shadow rounded-lg text-center">
            <strong>{recognition.title}</strong> <br />
            <small className="text-gray-500">Awarded on: {new Date(recognition.dateEarned).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No recognitions earned yet. Keep making an impact!</p>
    )}
  </div>
);

export default OrganizationRecognition;

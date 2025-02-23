"use client";

import React from "react";

interface Organization {
  profilePicUrl: string;
  name: string;
  joinDate: string;
  bio: string;
  impactMetrics: {
    volunteersEngaged: number;
    projectsHosted: number;
    communitiesImpacted: number;
  };
}

const OrganizationProfileCard = ({ org }: { org: Organization }) => {
  return (
    <div className="flex flex-col items-center p-6 border-r border-gray-300 w-80 text-center bg-white shadow-lg">
      <img
        src={org.profilePicUrl}
        alt="Organization Logo"
        className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg"
      />
      <h1 className="text-2xl font-bold">{org.name}</h1>
      <p className="text-gray-600">Established: {new Date(org.joinDate).toLocaleDateString()}</p>
      {org.bio && <p className="mt-2 text-gray-700 italic px-4">{org.bio}</p>}

      <div className="mt-4 p-4 bg-gray-100 rounded-lg w-full">
        <h2 className="text-lg font-semibold mb-2">Impact Metrics</h2>
        <p><strong>👥 Volunteers Engaged:</strong> {org.impactMetrics.volunteersEngaged}</p>
        <p><strong>🏗️ Projects Hosted:</strong> {org.impactMetrics.projectsHosted}</p>
        <p><strong>🌍 Communities Impacted:</strong> {org.impactMetrics.communitiesImpacted}</p>
      </div>
    </div>
  );
};

export default OrganizationProfileCard;

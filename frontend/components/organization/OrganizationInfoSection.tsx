"use client";

import React from "react";

interface Organization {
  contactNumber: string;
  contactEmail: string;
  location: string;
  website: string;
}

const OrganizationInfoSection = ({ org }: { org: Organization }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      <p><strong>📞 Phone:</strong> {org.contactNumber}</p>
      <p>
        <strong>📧 Email:</strong> <a href={`mailto:${org.contactEmail}`} className="text-blue-500">{org.contactEmail}</a>
      </p>
      <p><strong>📍 Location:</strong> {org.location}</p>
      <p>
        <strong>🔗 Website:</strong> <a href={org.website} target="_blank" className="text-blue-500">{org.website}</a>
      </p>
    </div>
  );
};

export default OrganizationInfoSection;

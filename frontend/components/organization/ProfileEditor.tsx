import React, { useState } from "react";

const ProfileEditor = () => {
  const [name, setName] = useState("Helping Hands");
  const [description, setDescription] = useState("We connect volunteers with impactful projects.");

  const handleSave = () => {
    console.log("Updated Profile:", { name, description });
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="font-bold">Edit Profile</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mt-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mt-2"
      />
      <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Save Changes
      </button>
    </div>
  );
};

export default ProfileEditor;

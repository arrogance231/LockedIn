"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  volunteer_list: string[];
  isFinished: boolean;
  organizer: string;
}

interface User {
  id: string;
  usertype: "volunteers" | "organization";
  pending_events: string[];
  completed_events: string[];
}

interface EventButtonProps {
  user: User;
  event: Event;
}

const EventButton: React.FC<EventButtonProps> = ({ user, event }) => {
  const router = useRouter();
  const [isEnlisted, setIsEnlisted] = useState(false);
  const [isFinished, setIsFinished] = useState(event.isFinished);

  useEffect(() => {
    if (user.usertype === "volunteers") {
      setIsEnlisted(user.pending_events.includes(event.id));
    }
  }, [user, event]);

  const enlistVolunteer = async () => {
    try {
      await fetch(`/api/enlist`, {
        method: "POST",
        body: JSON.stringify({ userId: user.id, eventId: event.id }),
      });
      setIsEnlisted(true);
      router.refresh();
    } catch (error) {
      console.error("Error enlisting:", error);
    }
  };

  const approveVolunteer = async () => {
    try {
      await fetch(`/api/approve`, {
        method: "POST",
        body: JSON.stringify({ userId: user.id, eventId: event.id }),
      });
      router.refresh();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const rejectVolunteer = async () => {
    try {
      await fetch(`/api/reject`, {
        method: "POST",
        body: JSON.stringify({ userId: user.id, eventId: event.id }),
      });
      router.refresh();
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  const toggleEventCompletion = async () => {
    try {
      await fetch(`/api/toggle-event`, {
        method: "POST",
        body: JSON.stringify({ eventId: event.id, isFinished: !isFinished }),
      });
      setIsFinished(!isFinished);
      router.refresh();
    } catch (error) {
      console.error("Error toggling event completion:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {user.usertype === "volunteers" ? (
        <button
          onClick={enlistVolunteer}
          disabled={isEnlisted}
          className={`px-4 py-2 text-white ${isEnlisted ? "bg-gray-500" : "bg-blue-500"} rounded-md`}
        >
          {isEnlisted ? "Enlisted" : "Enlist"}
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={approveVolunteer} className="px-3 py-2 bg-green-500 text-white rounded-md">
            ✔️
          </button>
          <button onClick={rejectVolunteer} className="px-3 py-2 bg-red-500 text-white rounded-md">
            ❌
          </button>
        </div>
      )}

      {user.id === event.organizer && (
        <button
          onClick={toggleEventCompletion}
          className={`px-4 py-2 rounded-md ${isFinished ? "bg-gray-500" : "bg-orange-500"} text-white`}
        >
          {isFinished ? "Event Completed" : "Mark as Completed"}
        </button>
      )}
    </div>
  );
};

export default EventButton;

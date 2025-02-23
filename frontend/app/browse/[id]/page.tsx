import React from "react";
import PocketBase from "pocketbase";
import NavBar from "@/components/NavBar";
const pb = new PocketBase("http://127.0.0.1:8090");

interface Event {
  id: string;
  event_title: string;
  event_desc: string;
  organizer: string;
  isFinished: boolean;
  picture: string;
  long: number;
  lang: number;
  date: Date;
}

interface EventPageProps {
  params: {
    id: string;
  };
}

async function fetchEvent(id: string): Promise<Event> {
  const eventData = await pb.collection("events").getOne(id);
  return {
    id: eventData.id,
    event_title: eventData.event_title,
    event_desc: eventData.event_desc,
    organizer: eventData.organizer,
    isFinished: eventData.isFinished,
    picture: eventData.picture || "",
    long: eventData.long,
    lang: eventData.lang,
    date: new Date(eventData.date),
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await fetchEvent(params.id);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <NavBar />
      <div className="flex flex-col h-screen w-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)] xl:p-12 overflow-y-auto">
        {event.picture && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white shadow-lg rounded-lg h-[100vh]">
            <div className="col-span-1 h-full">
              <img
                src={event.picture}
                alt={event.event_title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-1 h-full">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={event.picture}
                  alt={event.event_title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 h-auto md:h-[80vh] mt-16 mb-10 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
              {event.event_title}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-blue-600">
              Organized by: {event.organizer}
            </p>
          </div>
          <div className="mb-4 h-auto md:h-[30vh]">
            <p className="text-base md:text-lg text-gray-700">
              {event.event_desc}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 md:mb-0">
              Contact Now
            </button>
            <p className="text-base md:text-lg text-gray-600">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-base md:text-lg text-gray-600">
              Status: {event.isFinished ? "Finished" : "Ongoing"}
            </p>
          </div>
        </div>
        <div className="h-auto md:h-[100vh] mb-4 p-4 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="h-[50vh] md:h-[90vh]">
            <iframe
              src={`https://www.google.com/maps?q=${event.lang},${event.long}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, height: "100%" }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
          <div className="h-auto md:h-[10vh] flex flex-col justify-center items-center">
            <p className="text-base md:text-lg text-gray-600">Coordinates:</p>
            <p className="text-base md:text-lg text-gray-600">
              Latitude: {event.lang}
            </p>
            <p className="text-base md:text-lg text-gray-600">
              Longitude: {event.long}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

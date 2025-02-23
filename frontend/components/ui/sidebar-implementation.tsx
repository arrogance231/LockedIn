"use client";
import React, { useState, useEffect, JSX } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import pb from "@/app/lib/pocketbase_init";

type Event = {
  id: string;
  event_title: string;
  event_desc: string;
  organized_by: string;
  isFinished: boolean;
  picture: string;
  category: string;
};

export const Cards = ({ event }: { event: Event }) => {
  return (
    <div
      key={event.id}
      className="border-2 border-black p-4 bg-gray-100 rounded-lg w-full max-w-sm mx-auto"
    >
      <CardContainer>
        <CardBody>
          <CardItem className="text-lg font-bold text-neutral-600 text-center">
            {event.event_title}
          </CardItem>
          <CardItem as="p" className="text-sm text-center">
            {event.event_desc}
          </CardItem>
          <CardItem className="w-full mt-4">
            <Link href={`/browse/${event.id}`}>
              <Image
                src={
                  event.picture
                    ? pb.files.getURL(event, event.picture)
                    : "./bg.svg"
                }
                height={200}
                width={300}
                className="h-32 w-full object-cover rounded-xl border-2 border-black"
                alt={event.event_title}
                onError={(e) => {
                  e.currentTarget.src = "/default-image.jpg";
                }}
              />
            </Link>
          </CardItem>
          <div className="flex justify-center mt-5">
            <CardItem
              as={Link}
              href={`/browse/${event.id}`}
              className="text-base"
            >
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                More Details
              </button>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export function SidebarDemo() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "All",
                  href: "#",
                  icon: (
                    <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={() => setSelectedCategory("All")}
              />
              <SidebarLink
                link={{
                  label: "Youth Education",
                  href: "#",
                  icon: (
                    <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={() => setSelectedCategory("Youth Education")}
              />
              <SidebarLink
                link={{
                  label: "Disaster Response",
                  href: "#",
                  icon: (
                    <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={() => setSelectedCategory("Disaster Response")}
              />
              <SidebarLink
                link={{
                  label: "Public Health",
                  href: "#",
                  icon: (
                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={() => setSelectedCategory("Public Health")}
              />
              <SidebarLink
                link={{
                  label: "Coast Cleanup",
                  href: "#",
                  icon: (
                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                onClick={() => setSelectedCategory("Coast Cleanup")}
              />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="./bg.svg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard selectedCategory={selectedCategory} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = ({
  selectedCategory,
}: {
  selectedCategory: string;
}): JSX.Element => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    () => {
      const fetchEvents = async (category: string) => {
        try {
          const filter = category === "All" ? "" : `category="${category}"`;
          const resultList = await pb.collection("events").getList(1, 50, {
            filter,
          });
          const formattedEvents: Event[] = resultList.items.map(
            (item: any) => ({
              id: item.id,
              event_title: item.event_title,
              event_desc: item.event_desc,
              organized_by: item.organized_by,
              isFinished: item.isFinished,
              picture: item.picture || "",
              category: item.category || "Uncategorized",
            })
          );
          setEvents(formattedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvents(selectedCategory);
    },
    [selectedCategory] as const
  );

  const filterEventsByCategory = (events: Event[], category: string) => {
    return category === "All"
      ? events
      : events.filter((event) => event.category === category);
  };

  const filteredEvents = filterEventsByCategory(events, selectedCategory);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)] w-full xl:p-12 overflow-y-auto">
      <div className="flex flex-col h-auto mb-10">
        <div>
          <h1 className="text-bold text-4xl font-extrabold mb-4">Pick a Job</h1>
        </div>
        <div>
          <p className="">Description</p>
        </div>
      </div>
      <div className="flex w-full border-2 justify-center border-black p-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filteredEvents.map((event) => (
            <Cards key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

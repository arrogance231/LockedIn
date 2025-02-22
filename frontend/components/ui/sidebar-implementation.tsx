"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
//import { cn } from "@/lib/utils";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import pb from "@/app/lib/pocketbase_init"
// remove effect on description & title, keep on img.
/*
TO DO:
1. CREATE Card per record in "event" collection
2. Fill Value per card per event record
3. Link each card to anchor href towards a dynamic route that uses the event ID as it's basis.


*/
export const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row border-2 border-black p-4 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)] rounded-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <CardContainer className="flex-1">
        <CardBody>
          <CardItem className="text-xs sm:text-sm md:text-lg font-bold text-neutral-600 dark:text-white text-center">
            Job Title
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-xs sm:text-sm md:text-base text-center"
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem className="w-full mt-2 md:mt-4">
            <Image
              src="./bg.svg"
              height="1000"
              width="1000"
              className="h-24 sm:h-32 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl border-2 border-black p-2"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-center mt-5 md:mt-10">
            <CardItem
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="text-xs sm:text-sm md:text-base dark:text-white"
            >
              <button className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-lg">
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
  const links = [
    {
      label: "Search & Rescue",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "First Aid & Medical",
      href: "#",
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Firefighter",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Emergency Shelter",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
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
      <Dashboard />
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

// Dummy dashboard component with content
const Dashboard = () => {
  const [cards, setCards] = useState([<Cards key={0} />]);

  const addCard = async () => {
    const resultList = await pb.collection('event').getList(1, 50, {
      
    });

    if (resultList.items.length === 0) {
      return;
    }

    const newCards = resultList.items.map((_, index) => (
      <Cards key={cards.length + index} />
    ));

    setCards([...cards, ...newCards]);
  };

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
        <div className="grid grid-cols-3 gap-4">{cards}</div>
      </div>
    </div>
  );
};

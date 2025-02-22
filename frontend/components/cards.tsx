"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row border-2 border-black p-4 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)] rounded-lg overflow-hidden">
      <CardContainer className="flex-1">
        <CardBody>
          <CardItem className="text-sm md:text-lg font-bold text-neutral-600 dark:text-white">
            Job Title
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-xs md:text-base">
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem className="w-full mt-2 md:mt-4">
            <Image
              src="./bg.svg"
              height="1000"
              width="1000"
              className="h-32 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl border-2 border-black p-2"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-5 md:mt-20">
            <CardItem
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-2 md:px-4 py-1 md:py-2 rounded-xl text-xs md:text-sm font-normal dark:text-white"
            >
              <button className="bg-black text-white p-1 md:p-3 rounded-lg">
                More Details
              </button>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default Cards;

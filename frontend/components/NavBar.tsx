import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index";
import Image from "next/image";
const NavBar = () => {
  return (
    <div>
      <nav className="flex justify-between bg-[#4A6397] h-[60px]">
        <div className="my-auto flex gap-4">
          <a href="./browse">
            <Image src="./icon.svg" alt="icon" width={50} height={50}></Image>
          </a>
          <Input
            placeholder="Search Jobs"
            className="text-white bg-[#6D84B3] text-center"
          ></Input>
        </div>
        <div className="justify-center h-full items-center">
          <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden font-bold relative h-full">
            {navLinks.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <Image src={item.img} alt={item.label} width={20} height={20} />
                <a
                  href={item.href}
                  className="font-bold size-8xl font-montserrat leading-normal text-lg bg-gradient-to-r from-orange-400 to-teal-200 bg-clip-text text-transparent animate-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-12 h-full flex justify-center items-center max-lg:hidden">
          <a href="./login">
            <Button>Join Us</Button>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

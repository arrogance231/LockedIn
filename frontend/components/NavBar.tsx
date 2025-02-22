"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";

const NavBar = () => {
  const { user, loading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center bg-transparent h-[60px] w-full p-4 px-8 my-2 text-white ">
      <div className="flex items-center border-2 border-gray-700 rounded-3xl p-2 flex-shrink-0 bg-gray-200">
        <Image
          src="/search.svg"
          alt="icon"
          width={20}
          height={20}
          className="ml-2"
        />
        <input
          type="text"
          className="border-none outline-none ml-2 bg-transparent text-white placeholder-gray-400"
          placeholder="Search Jobs"
        />
      </div>
      <ul className="hidden lg:flex items-center space-x-4 flex-grow justify-center font-poppins gap-10 font-extrabold mx-auto">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-black hover:text-gray-400 font-extrabold"
          >
            <li>{link.label}</li>
          </a>
        ))}
      </ul>
      <div className="flex items-center space-x-4 flex-shrink-0 gap-10">
        <a href="./login">
          <button className="bg-gray-600 p-2 rounded-lg text-white hover:bg-gray-700">
            Log In
          </button>
        </a>
        <button className="bg-gray-600 p-2 rounded-lg text-white hover:bg-gray-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";

const NavBar = () => {
  const { user, loading, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return null; // Prevent hydration errors
  }

  const isLoggedIn = !!user;
  const isOrganization = user?.usertype === "organization"; // ✅ Ensure `usertype` is properly fetched

  return (
    <nav className="flex justify-between items-center bg-transparent h-[60px] w-full p-4 px-8 my-2 text-white border-b-[2px] border-black">
      {/* 🔎 Search Bar */}
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
          className="border-none outline-none ml-2 bg-transparent text-black placeholder-gray-600"
          placeholder="Search Jobs"
        />
      </div>

      {/* 🌐 Navigation Links */}
      <ul className="hidden lg:flex items-center space-x-4 flex-grow justify-center font-poppins gap-10 font-extrabold mx-auto text-black">
        <a href="./">
          <li>Home</li>
        </a>
        <a href="./browse">
          <li>Browse</li>
        </a>
        {isLoggedIn && isOrganization && (
          <li>
            <Link href="/create">
              <button className="p-2 rounded-lg text-black ">Create</button>
            </Link>
            <Link href="/organization">
              <button className="p-2 rounded-lg text-black ">
                Organization
              </button>
            </Link>
          </li>
        )}
      </ul>

      {/* 🔐 Authentication Buttons */}
      <div className="flex items-center space-x-4 flex-shrink-0 gap-6">
        {isLoggedIn ? (
          <>
            <button
              onClick={logout}
              className="bg-gray-600 p-2 rounded-lg text-white hover:bg-gray-700"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-gray-600 p-2 rounded-lg text-white ">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-gray-600 p-2 rounded-lg text-white ">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

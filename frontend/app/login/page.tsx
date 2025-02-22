"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";
import { navLinks } from "@/constants";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

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

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/browse");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    try {
      await login(email, password);
      router.refresh();
      router.replace("/browse");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLocalError(error.message);
      } else {
        setLocalError("Login error");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="flex items-center space-x-4 flex-grow justify-center font-poppins gap-10 font-extrabold p-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="lg-max:hidden text-gray-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex h-full items-center justify-center text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ">
        <div className="w-1/2 h-full flex items-center justify-center">
          <Image
            src="./login-bg.svg"
            alt="bg"
            width={0}
            height={0}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="m-4 flex flex-col w-1/2 p-8 bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] rounded shadow-lg space-y-4 z-10 relative">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          {localError && (
            <p className="text-red-500 text-center">{localError}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
            >
              Login
            </button>
          </form>
        </div>
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={1}
          />
        </div>
      </div>
    </div>
  );
}

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

"use client";
import ObserverProvider from "@/components/ui/ObserverProvider";
import NavBar from "@/components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CardContent,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Han", "One", "1"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <ObserverProvider>
      <main className="flex flex-col motion-preset-compress motion-duration-300 gap-5 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)]">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <NavBar />
        </div>

        {/* Hero Section */}
        <section className="flex w-screen h-[100vh] pt-8 px-8 border-b-2 border-white overflow-hidden">
          {/* Background Sparkles */}
          <div className="absolute inset-0 w-full h-full">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#907F7F"
              speed={4}
            />
          </div>

          {/* Left Content */}
          <div className="w-1/2 flex flex-col p-10 justify-around">
            <div className="flex gap-2 justify-center">
              <h1 className="font-poppins animate-gradient bg-gradient-to-l from-indigo-700 to-cyan-200 bg-clip-text text-transparent text-[150px]">
                Bayani
              </h1>
              <div>
                <span className="justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="text-center absolute font-normal text-[150px] font-poppins text-[#DA0000]"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="mb-10">
              <p className="text-[30px] text-orange-400 font-sans font-bold top-5">
                "Empowering Heroes, Uniting as One!"
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-8">
              <h1 className="text-center text-6xl"> Which Are You?</h1>
              {/* Volunteer Button */}
              <div className="transform transition-transform duration-500 hover:translate-x-10">
                <Link href="/signup/volunteer">
                  <div className="relative flex items-center gap-4">
                    <Image
                      src="/volunteer.svg"
                      alt="Volunteer"
                      width={80}
                      height={80}
                      className="h-20 w-20"
                    />
                    <button className="w-full border-2 border-black text-[50px] rounded-md bg-[#1C286B] text-white font-poppins py-2">
                      Volunteer
                    </button>
                  </div>
                </Link>
              </div>
              {/* Organization Button */}
              <div className="transform transition-transform duration-500 hover:translate-x-10">
                <Link href="/signup/organization">
                  <div className="relative flex items-center gap-4">
                    <Image
                      src="/organization.svg"
                      alt="Organization"
                      width={80}
                      height={80}
                      className="h-20 w-20"
                    />
                    <button className="w-full border-2 border-black text-[50px] rounded-md bg-[#943436] text-white font-poppins py-2">
                      Organization
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-1/2 flex justify-center items-center h-screen absolute right-2 top-17">
            <Image
              src="/head.svg"
              alt="Hero Image"
              width={500}
              height={500}
              className="w-full h-full"
            />
          </div>
        </section>

        {/* Section Divider */}
        <section className="w-[100vw] h-[100vh] p-4 rounded-lg bg-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Image
                    src="/v1.jpg"
                    alt="alt"
                    width={1000}
                    height={1000}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p></p>
              </CardFooter>
            </Card>
          </motion.div>
        </section>

        {/* "Why Bayani One?" Section */}
        <section className="h-auto w-screen intersect-once intersect:motion-preset-slide-up pb-20 relative">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  Why <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none flex justify-center gap-2">
                    <h1 className="font-poppins animate-gradient bg-gradient-to-l from-indigo-700 to-cyan-200 bg-clip-text text-transparent">
                      Bayani
                    </h1>
                    <h1 className="font-poppins text-[#DA0000]">One?</h1>
                  </span>
                </h1>
              </>
            }
          >
            {/* Sparkles Background */}
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={20}
                className="w-full h-full"
                particleColor="#907F7F"
                speed={4}
              />
            </div>

            {/* Feature Cards (4 columns on large screens) */}
            <div className="mx-auto max-w-7xl px-8 mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <Image
                  src="/advocay.svg"
                  alt="Find your Advocacy"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Find Your Advocacy</h3>
                <p className="mt-2 text-gray-700">
                  Discover meaningful causes that align with your passion.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <Image
                  src="/train.svg"
                  alt="Join & Train"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Join & Train</h3>
                <p className="mt-2 text-gray-700">
                  Engage in training and workshops to amplify your impact.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <Image
                  src="/impact.svg"
                  alt="Volunteer & Impact"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Volunteer & Impact</h3>
                <p className="mt-2 text-gray-700">
                  Make a real difference in your community by taking action.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <Image
                  src="/certify.svg"
                  alt="Certify & Grow"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Certify & Grow</h3>
                <p className="mt-2 text-gray-700">
                  Earn certifications and expand your network for future
                  success.
                </p>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* About Us Section */}
        <section className="py-16 px-8 flex flex-col items-center bg-white">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl">
            <Image
              src="/volunteer.svg"
              alt="Volunteer"
              width={300}
              height={300}
              className="rounded-lg shadow-md"
            />
            <p className="text-lg text-gray-700 leading-relaxed">
              BayaniOne is a platform dedicated to fostering and local
              governance that drives impactful change. BayaniOne invites you to
              contribute to society while gaining relevant skills and
              experiences in various fields of volunteerism and civic
              engagement. By uniting people from all walks of life, we strive to
              create a supportive and collaborative environment for meaningful
              social impact.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            {/* Logo / Brand */}
            <div className="flex flex-col items-start mb-4 md:mb-0">
              <h3 className="text-3xl font-bold">BayaniOne</h3>
              <p className="text-sm text-gray-300 mt-1">
                Empowering Heroes, Uniting as One!
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-start text-sm text-gray-300 space-y-1">
              <span>Location: Barangay Banaba, San Mateo, Rizal</span>
              <span>Phone: 123-456-7890</span>
              <span>Email: info@bayanione.com</span>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} BayaniOne. All rights reserved.
          </div>
        </footer>
      </main>
    </ObserverProvider>
  );
}

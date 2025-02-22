"use client";
import ObserverProvider from "@/components/ui/ObserverProvider";
import NavBar from "@/components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
      <main className="flex flex-col motion-preset-compress motion-duration-300 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%)]">
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
              <p className="text-[35px] text-orange-400 font-sans font-bold top-5">
                "Empowering Heroes, Uniting as One!"
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-8">
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
          <div className="w-1/2 flex justify-center items-center h-screen absolute right-2 top-0">
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
        <section className="w-[100vw] h-[30vh] border-2 border-black mt-20"></section>

        {/* "Why Bayani One?" Section */}
        <section className="h-screen w-screen intersect-once intersect:motion-preset-slide-up">
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
            <Image
              src="/image.svg"
              alt="Hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </section>

        {/* Empty Section (for additional content) */}
        <section></section>
      </main>
    </ObserverProvider>
  );
}

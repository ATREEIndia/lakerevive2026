'use client';

import Image from "next/image";
import Link from "next/link";
import Heading from "./Components/Heading";
import SubHeading from "./Components/SubHeading";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import website_amin from "@/public/website-working.json";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Textbox from "./Components/Textbox";
import Homecard from "./Components/Homecard";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // only set to true after component has mounted
  }, []);

  return (
    <main>
      <Navbar currentpage="home"></Navbar>
      <Banner></Banner>
      <div className="flex flex-col gap-4 p-4 lg:px-8">

        <div className="w-full flex justify-center items-center">
          <Heading customClassname="text-3xl" text="What is LakeRevive?"></Heading>
        </div>

        <Textbox Content="LakeRevive is an innovative decision-support tool designed to help contractors, 
        site engineers, environmental professionals &  citizen volunteers select appropriate nature-based solutions (NbS) 
        for urban lake restoration initiatives. The tool guides users through a systematic process to determine whether blue-green 
        infrastructure such as constructed wetland (CW), floating islands (FI), or a combination of both would be most effective for 
        their specific lake conditions. Additionally, it also provides guidance on rejuvenation of shoreline for water quality and biodiversity enhancement." ></Textbox>

        <div className="w-full bg-gray-100 p-4">
          <Textbox Content="NOTE: This tool is applicable for lakes facing algal bloom, fish kill events, 
        spread of invasive species due to inflows of secondary treated domestic wastewater" ></Textbox>
        </div>
        <div className="flex w-full px-4 gap-2 ">
        <Homecard></Homecard>
        <Homecard></Homecard>
        <Homecard></Homecard>
        </div>
       

        






      </div>























      {/* 
      <div className="flex flex-col w-full p-8 justify-center items-center">
        <div className="w-[300px]">
          {isClient && (
            <Lottie animationData={website_amin} autoplay loop />
          )}
        </div>
        <Heading text="The home page of this app is under progress." />
        <SubHeading text="Please skip to the tool page" />
        <Link
          className="bg-blue-200 p-4 shadow-2xl text-xl font-semibold rounded-xl mt-4"
          href="/tool"
        >
          Open Tool page
        </Link>
      </div> */}
    </main>
  );
}

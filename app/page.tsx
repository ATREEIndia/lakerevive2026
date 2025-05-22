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
import image_algal from '@/public/algalBloom.jpg'
import image_userfriendly from '@/public/userfireldy.jpg'
import image_climate_resilience from '@/public/climate resillience.jpg'
import image_secchi_disk from '@/public/secchi_disk.jpg'
import HomeRowsection from "./Components/HomeRowsection";
import Homesteps from "./Components/Homesteps";
import image_urban_Lake_crisis from '@/public/ulc.jpg'
import image_democratic_lake_conservation from '@/public/democartic_lake_conservation.jpg'
import image_knowledge_gap from '@/public/knowledge.jpg'
import image_clean_lake from '@/public/clean_lake.jpg'



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

        <div className="w-full bg-gray-100 p-4 ">
          <Textbox Content="NOTE: This tool is applicable for lakes facing algal bloom, fish kill events, 
        spread of invasive species due to inflows of secondary treated domestic wastewater. If a lake is used as a 
        flood-mitigation tool, the contractor must consider the full-tank level and draw-down level, especially for CW" ></Textbox>
        </div>


        <div className="flex w-full px-4 gap-2 flex-col sm:flex-row">
          <Homecard
            card_image={image_userfriendly}
            title="User-friendly scientifically backed solutions"
            content="LakeRevive requires basic lake morphological and 
        hydrological data as an input which is typically found in the Detailed Project Report (DPR)."/>

          <Homecard
            card_image={image_secchi_disk}
            title="Resource optimization"
            content="The scale and design of NbS is optimised considering self assimilation capacity of the lake 
        and optimal nutrient levels in urban lake to achieve average water clarity (Secchi depth) of 40–80 cm."/>

          <Homecard
            card_image={image_climate_resilience}
            title="Climate Resilience"
            content="The NbS recommended by LakeRevive contribute to climate change mitigation and 
        adaptation by enhancing, improving water retention and ground-water recharge and regulating micro-climate."/>

        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <Heading customClassname="text-3xl" text="Why LakeRevive is Important?"></Heading>
        </div>

        <Textbox Content="Urban lakes are vital ecosystems facing unprecedented threats from urbanisation, 
        pollution and climate change. Despite addressing the inflows of raw sewage, secondary wastewater discharges 
        (enriched with nutrients) and urban runoffs are leading to degradation of restored lakes. LakeRevive helps in designing 
        solutions to address issues such as algal bloom or low water clarity and extremely low early morning DO (<4mg/l) caused by 
        inflows of nutrients such as TP and TN." ></Textbox>

        <div className="w-full mt-4 flex flex-col gap-4">
          <HomeRowsection
            section_image={image_urban_Lake_crisis}
            heading="Addresses the urban Lake crisis"
            content="Lakes across the rapidly urbanising catchments are deteriorating at an alarming rate due to sewage inflow, 
          industrial pollution and encroachment. In many cities, including Bengaluru, most of urban water bodies show signs of severe degradation, 
          with high nutrient loads leading to eutrophication, algal blooms and fish kills. LakeRevive provides timely 
          intervention strategies to reverse this decline."></HomeRowsection>

          <HomeRowsection
            section_image={image_knowledge_gap}
            heading="Bridging the knowledge-implementation Gap"
            content="Despite growing scientific understanding of lake ecosystems, there remains a significant gap between research and practical implementation of NbS. 
          Due to the lack of design principles, many restoration projects fail to achieve improved water quality and biodiversity at urban lakes. LakeRevive bridges 
          this gap by translating complex scientific principles into actionable recommendations."></HomeRowsection>

          <HomeRowsection
            section_image={image_democratic_lake_conservation}
            heading="Democratising Lake Conservation"
            content="Lake restoration has traditionally required specialised expertise that is often inaccessible to local communities and smaller organisations. 
          LakeRevive democratises this process by making scientific decision-making available to a wider audience, empowering local stakeholders to take meaningful 
          action for their neighborhood lakes."></HomeRowsection>

          <HomeRowsection
            section_image={image_algal}
            heading="Supporting evidence-based policy"
            content="The tool will help generate evidence on efficacy of NbS in improving lake health. This would help in formulating evidence-based policies. To generate the evidence, 
          communities can use lake health score card, for which the link is provided in the lake heath index page."></HomeRowsection>

          <HomeRowsection
            section_image={image_clean_lake}
            heading="Preserving ecosystem services"
            content="Access to clean lakes enhances mental well-being. Studies show that spending time in natural spaces reduces stress, boosts mood and fosters a sense of connection 
          with nature. Restored lakes become community hubs for recreation, reflection and learning."></HomeRowsection>

        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-center items-center mt-4">
            <Heading customClassname="text-3xl" text="How does it work?"></Heading>
          </div>

          <div className="flex flex-col gap-10 lg:gap-15 mt-5">
            <Homesteps
              step_image={image_algal}
              heading="Step 1: Enter Basic Lake Parameters"
              content={`Begin by entering fundamental lake characteristics from your Detailed Project Report (DPR):
            • Lake surface area (m²)
            • Average depth (m)
            • Water quality parameters {Total Phosphorus(TP) levels}
            • Area available for implementing NbS`} />

            <Homesteps
              step_image={image_algal}
              heading="Step 2: Enter Inflow Information"
              content={`Provide details about the water entering your lake:
               •Inflow rate (KLD or m³/day)
               •Inflow water quality (TP levels)`} />

            <Homesteps
              step_image={image_algal}
              heading="Step 3: Automated Analysis"
              content={`The tool then processes this information through specialised algorithms that
              • Calculates nutrient loading rates
              • Determine removal requirements to achieve target water quality
               • Assess the feasibility of different NbS based on the available space and lake morphology`} />

            <Homesteps
              step_image={image_algal}
              heading="Step 4: Solution Recommendation"
              content={`Based on the analysis, LakeRevive provides:
               • A clear recommendation for either CW or FI, or a combination of both
               • The required size and configuration of the recommended solution
               • Expected nutrient removal efficiency
               • Alternative approaches if standard NbS are insufficient `} />

            <Homesteps
              step_image={image_algal}
              heading="Step 5: Implementation Guidance"
              content={`The tool offers practical guidance for implementing the recommended solution:
              • Design parameters for CW or FI
              • Plant species recommendations
              • Maintenance requirements `} />

            
          </div>

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

'use client';

import Image from "next/image";
import Link from "next/link";
import Heading from "./Components/Heading";
import Zigzagsection from "./Components/Zigzgasection";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import website_amin from "@/public/website-working.json";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Textbox from "./Components/Textbox";
import Homecard from "./Components/Homecard";
import image_algal from '@/public/algalBloom.jpg'
import image_userfriendly from '@/public/userfireldy.jpg'
import image_climate_resilience from '@/public/climate-resillience.jpg'
import image_policy from '@/public/policy.jpg'
import HomeRowsection from "./Components/HomeRowsection";
import Homesteps from "./Components/Homesteps";
import image_urban_Lake_crisis from '@/public/ulc.jpg'
import image_democratic_lake_conservation from '@/public/democartic_lake_conservation.jpg'
import image_knowledge_gap from '@/public/knowledge.jpg'
import image_ecosystem_service from '@/public/ecosystem_service.jpg'
import image_resource_optimization from '@/public/resource_optimization.jpg'
import image_step_1 from '@/public/Step_1.jpg'
import image_step_2 from '@/public/Step_2.jpg'
import image_step_3 from '@/public/Step_3.jpg'
import image_step_4 from '@/public/Step_4.jpg'
import image_step_5 from '@/public/Step_5.jpg'
import { currentlanguage } from "./Components/Languagecontex";



// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // only set to true after component has mounted
  }, []);

  const { isEng, setisEng } = currentlanguage();

  return (
    <main>
      <Navbar currentpage="Home"></Navbar>
      <Banner title={isEng?"LakeRevive":"ಲೇಕ್‌ ರಿವೈವ್"} subtitle=""></Banner>


      {/* english and kannada */}
      {/* English content */}
      <div className={`${isEng?'flex':'hidden'} flex-col gap-4 p-4 lg:px-8`}>

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
        flood-mitigation tool, the contractor must consider the full-tank level and draw-down level, especially for constructed wetland." ></Textbox>
        </div>


        <div className="flex w-full px-4 gap-2 flex-col sm:flex-row">
          <Homecard
            card_image={image_userfriendly}
            title="User-friendly scientifically backed solutions"
            content="LakeRevive requires basic lake morphological and 
        hydrological data as an input which is typically found in the Detailed Project Report (DPR)."/>

          <Homecard
            card_image={image_resource_optimization}
            title="Resource optimization"
            content="The scale and design of NbS is optimised considering self assimilation capacity of the lake 
        and optimal nutrient levels in urban lake to achieve average water clarity (secchi depth) of 40–80 cm."/>

          <Homecard
            card_image={image_climate_resilience}
            title="Climate resilience"
            content="The NbS recommended by LakeRevive contribute to climate change mitigation and 
        adaptation by enhancing, improving water retention and ground-water recharge and regulating micro-climate."/>

        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <Heading customClassname="text-3xl" text="Why LakeRevive is important?"></Heading>
        </div>

        <Textbox Content="Urban lakes are vital ecosystems facing unprecedented threats from urbanisation, 
        pollution and climate change. Despite addressing the inflows of raw sewage, secondary wastewater discharges 
        (enriched with nutrients) and urban runoffs are leading to degradation of restored lakes. LakeRevive helps in designing 
        solutions to address issues such as algal bloom or low water clarity and extremely low early morning Dissolved oxygen (DO) <4mg/l caused by 
        inflows of nutrients such as total phosphorus (TP) and total nitgrogen (TN)." ></Textbox>

        <div className="w-full mt-4 flex flex-col gap-4 sm:gap-0">

          <Zigzagsection
            item_index={1}
            section_image={image_urban_Lake_crisis}
            heading="Addressing the urban lake crisis"
            content="Lakes across the rapidly urbanising catchments are deteriorating at an alarming rate due to sewage inflow, 
          industrial pollution and encroachment. In many cities, including Bengaluru, most of urban water bodies show signs of severe degradation, 
          with high nutrient loads leading to eutrophication, algal blooms and fish kills. LakeRevive provides timely 
          intervention strategies to reverse this decline."></Zigzagsection>

          <Zigzagsection
            item_index={2}
            section_image={image_knowledge_gap}
            heading="Bridging the knowledge-implementation gap"
            content="Despite growing scientific understanding of lake ecosystems, there remains a significant gap between research and practical implementation of NbS. 
          Due to the lack of design principles, many restoration projects fail to achieve improved water quality and biodiversity at urban lakes. LakeRevive bridges 
          this gap by translating complex scientific principles into actionable recommendations."></Zigzagsection>

          <Zigzagsection
            item_index={3}
            section_image={image_democratic_lake_conservation}
            heading="Democratising lake conservation"
            content="Lake restoration has traditionally required specialised expertise that is often inaccessible to local communities and smaller organisations. 
          LakeRevive democratises this process by making scientific decision-making available to a wider audience, empowering local stakeholders to take meaningful 
          action for their neighborhood lakes."></Zigzagsection>

          <Zigzagsection
            item_index={4}
            section_image={image_policy}
            heading="Supporting evidence-based policy"
            content={<><p> The tool will help generate evidence on efficacy of NbS in improving lake health. This would help in formulating evidence-based policies. To generate the evidence,  communities can use lake health score card, for which the link is provided in the <Link className="text-green-600" href={'/lhi'} target="_blank"> lake heath index page.</Link></p>
            </>}
          ></Zigzagsection>

          <Zigzagsection
            item_index={5}
            section_image={image_ecosystem_service}
            heading="Preserving ecosystem services"
            content="Access to clean lakes enhances mental well-being. Studies show that spending time in natural spaces reduces stress, boosts mood and fosters a sense of connection 
          with nature. Restored lakes become community hubs for recreation, reflection and learning."></Zigzagsection>

        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-center items-center mt-4">
            <Heading customClassname="text-3xl" text="How does it work?"></Heading>
          </div>

          <div className="flex flex-col gap-10 lg:gap-15 mt-5">
            <Homesteps
              step_image={image_step_1}
              heading="Enter basic lake parameters"
              heading_mob="Step 1: Enter basic lake parameters"
              content={`Begin by entering fundamental lake characteristics from your Detailed Project Report (DPR):
            • Lake surface area (m²)
            • Average depth (m)
            • Water quality parameters [Total Phosphorus(TP) levels]
            • Area available for implementing NbS`} />

            <Homesteps
              step_image={image_step_2}
              heading="Enter inflow information"
              heading_mob="Step 2: Enter inflow information"
              content={`Provide details about the water entering your lake:
               • Inflow rate (KLD or m³/day)
               • Inflow water quality (TP levels)`} />

            <Homesteps
              step_image={image_step_3}
              heading="Automated analysis"
              heading_mob="Step 3: Automated analysis"
              content={`The tool then processes this information through specialised algorithms that
              • Calculates nutrient loading rates
              • Determine removal requirements to achieve target water quality
               • Assess the feasibility of different NbS based on the available space and lake morphology`} />

            <Homesteps
              step_image={image_step_4}
              heading="Solution recommendation"
              heading_mob="Step 4: Solution recommendation"
              content={`Based on the analysis, LakeRevive provides:
               • A clear recommendation for either CW or FI, or a combination of both
               • The required size and configuration of the recommended solution
               • Expected nutrient removal efficiency
               • Alternative approaches if standard NbS are insufficient `} />

            <Homesteps
              step_image={image_step_5}
              heading="Implementation guidance"
              heading_mob="Step 5: Implementation guidance"
              content={`The tool offers practical guidance for implementing the recommended solution:
              • Design parameters for CW or FI
              • Plant species recommendations
              • Maintenance requirements `} />


          </div>

        </div>
      </div>


      {/* Kannada content */}
       <div className={`${isEng?'hidden':'flex'} flex-col gap-4 p-4 lg:px-8`}>
        

        <div className="w-full flex justify-center items-center">
          <Heading customClassname="text-3xl" text="ಲೇಕ್‌ ರಿವೈವ್ ಎಂದರೇನು?"></Heading>

        </div>

        <Textbox Content="ಗುತ್ತಿಗೆದಾರರು, ಸೈಟ್ ಎಂಜಿನಿಯರ್‌ಗಳು, ಪರಿಸರ ವೃತ್ತಿಪರರು ಮತ್ತು ನಾಗರಿಕ ಸಂಸ್ಥೆಗಳ ಸ್ವಯಂಸೇವಕರು ನಗರ ಕೆರೆಗಳ ಪುನರುಜ್ಜೀವನ ಉಪಕ್ರಮಗಳಿಗೆ ಸೂಕ್ತವಾದ ಪ್ರಕೃತಿ ಆಧಾರಿತ ಪರಿಹಾರಗಳನ್ನು (NbS) ಆಯ್ಕೆ ಮಾಡುವ ನಿರ್ಧಾರವನ್ನು ಮಾಡಲು ಸಹಾಯ ಮಾಡುವ ಸಾಧನವೇ ಲೇಕ್ ರಿವೈವ್.

ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶ (CW), ತೇಲುವ ದ್ವೀಪಗಳು (FI) ಅಥವಾ ಈ ಎರಡರ ಸಂಯೋಜನೆಯಂತಹ ನೀಲಿ-ಹಸಿರು ಮೂಲಸೌಕರ್ಯವು ಕೆರೆಯ ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಹೆಚ್ಚು ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆಯೇ ಎಂದು ನಿರ್ಧರಿಸಲು ಈ ಉಪಕರಣವು ಬಳಕೆದಾರರಿಗೆ ವ್ಯವಸ್ಥಿತ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಇದಷ್ಟೇ ಅಲ್ಲದೇ ಲೇಕ್ ರಿವೈವ್ ನೀರಿನ ಗುಣಮಟ್ಟ ಮತ್ತು ಜೀವವೈವಿಧ್ಯತೆಯ ಬೆಳವಣಿಗಾಗಿ ತೀರ ಪ್ರದೇಶದ ಪುನರುಜ್ಜೀವನಕ್ಕೆ ಮಾರ್ಗದರ್ಶನವನ್ನು ಸಹ ಮಾಡುತ್ತದೆ." ></Textbox>

        <div className="w-full bg-gray-100 p-4 ">
          <Textbox Content="ಗಮನಿಸಿ: ಆಲ್ಗೆಗಳು, ಮೀನುಗಳ ಸಾವು, ಮಾಧ್ಯಮಿಕ ಸಂಸ್ಕರಿತ ತ್ಯಾಜ್ಯನೀರಿನ ಒಳಹರಿವಿನಿಂದ ಆಕ್ರಮಣಕಾರಿ ಪ್ರಭೇದಗಳ ಹರಡುವಿಕೆಯ ಸಮಸ್ಯೆಗಳನ್ನು ಎದುರಿಸುತ್ತಿರುವ ಕೆರೆಗಳಿಗೆ ಈ ಉಪಕರಣದ ಬಳಕೆಯು ಹೇಳಿಮಾಡಿಸಿದಂತಿದೆ.ಗುತ್ತಿಗೆದಾರರು ಕೆರೆಯನ್ನು ಪ್ರವಾಹ ತಗ್ಗಿಸುವ ಸಾಧನವಾಗಿ ಬಳಸಿದರೆ  ಅವರು ಪೂರ್ಣ-ಟ್ಯಾಂಕ್ ಮಟ್ಟ ಮತ್ತು ಡ್ರಾ-ಡೌನ್ ಮಟ್ಟವನ್ನು ಪರಿಗಣಿಸಬೇಕು (ವಿಶೇಷವಾಗಿ ನಿರ್ಮಿಸಿದ ಜೌಗು ಪ್ರದೇಶಕ್ಕೆ).
" ></Textbox>
        </div>


        <div className="flex w-full px-4 gap-2 flex-col sm:flex-row">
          <Homecard
            card_image={image_userfriendly}
            title="ಬಳಕೆದಾರ ಸ್ನೇಹಿ, ವೈಜ್ಞಾನಿಕವಾಗಿ ಬೆಂಬಲಿತ ಪರಿಹಾರಗಳು"
            content="ಸಾಮಾನ್ಯವಾಗಿ ವಿಸ್ತೃತ ಯೋಜನಾ ವರದಿಯಲ್ಲಿ ಕಂಡುಬರುವ (DPR) ಕೆರೆಯ ಮೂಲಭೂತ ರೂಪವಿಜ್ಞಾನ ಮತ್ತು ಜಲವಿಜ್ಞಾನ ಮಾಹಿತಿ ಲೇಕ್ ರಿವೈವಿಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸಲು ಬೇಕಾಗುತ್ತದೆ."/>

          <Homecard
            card_image={image_resource_optimization}
            title="ಸಂಪನ್ಮೂಲಗಳ ಸರಿಹೊಂದಿಸುವಿಕೆ"
            content="ಕೆರೆಯ ಸ್ವಯಂಸಂಯೋಜನೆಯ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ನಗರ ಕೆರೆಯ 40–80 ಸೆಂ.ಮೀ.ನಷ್ಟು ಸರಾಸರಿ ನೀರಿನ ಸ್ಪಷ್ಟತೆಯನ್ನು (ಸೆಚ್ಚಿ ಆಳ) ಸಾಧಿಸಲು ಸೂಕ್ತವಾದ ಪೋಷಕಾಂಶಗಳ ಮಟ್ಟವನ್ನು ಪರಿಗಣಿಸಿ NbS ನ ಪ್ರಮಾಣ ಮತ್ತು ವಿನ್ಯಾಸವನ್ನು ಅತ್ಯುತ್ತಮವಾಗಿ ಸರಿಹೊಂದಿಸಲಾಗಿದೆ. "/>

          <Homecard
            card_image={image_climate_resilience}
            title="ಹವಾಮಾನ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ"
            content="ಲೇಕ್‌ ರಿವೈವ್ NbS ಶಿಫಾರಸು ನೀರಿನ ಧಾರಣಾ ಮತ್ತು ಅಂತರ್ಜಲ ಮರುಪೂರಣವನ್ನು ಹೆಚ್ಚಿಸುವ, ಸುಧಾರಿಸುವ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಹವಾಮಾನವನ್ನು ನಿಯಂತ್ರಿಸುವ ಮೂಲಕ ಹವಾಮಾನ ಬದಲಾವಣೆ ಕಡಿಮೆ ಮಾಡುವುದಕ್ಕೆ ಮತ್ತು ಹೊಂದಾಣಿಕೆಗೆ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ."/>

        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <Heading customClassname="text-3xl" text="ಲೇಕ್‌ ರಿವೈವ್ ಏಕೆ ಮುಖ್ಯ?"></Heading>
        </div>

        <Textbox Content="ನಗರ ಪ್ರದೇಶದ ಕೆರೆಗಳು ನಗರೀಕರಣ, ಮಾಲಿನ್ಯ ಮತ್ತು ಹವಾಮಾನ ಬದಲಾವಣೆಯಿಂದ ಇಂದು ಹಿಂದೆಂದಿಗಿಂತಲೂ ಹೆಚ್ಚು ಅಪಾಯಗಳನ್ನು ಎದುರಿಸುತ್ತಿರುವ ಪ್ರಮುಖ ಪರಿಸರ ವ್ಯವಸ್ಥೆಗಳಾಗಿವೆ. ಕಚ್ಚಾ ಕೊಳಚೆ ನೀರಿನ ಒಳಹರಿವುಗಳನ್ನು ತಡೆದರೂ, ಮಾಧ್ಯಮಿಕ ಸಂಸ್ಕರಿತ ತ್ಯಾಜ್ಯನೀರಿನ ವಿಸರ್ಜನೆಗಳು (ಪೋಷಕಾಂಶಗಳಿಂದ ಸಮೃದ್ಧ) ಮತ್ತು ನಗರ ಪ್ರದೇಶದ ನೀರಿನ ಹರಿವುಗಳು ಪುನರುಜ್ಜೀವನ ಮಾಡಲಾದ ಕೆರೆಗಳ ನಾಶಕ್ಕೆ ಕಾರಣವಾಗುತ್ತಿವೆ. ಆಲ್ಗೆಗಳ ಬೆಳವಣಿಗೆ ಅಥವಾ ನೀರಿನ ಕಡಿಮೆ ಸ್ಪಷ್ಟತೆ ಮತ್ತುಒಟ್ಟು ರಂಜಕ (TP) ಮತ್ತುಒಟ್ಟು ಸಾರಜನಕ (TN)ನಂತಹ ಪೋಷಕಾಂಶಗಳ ಒಳಹರಿವಿನಿಂದ ಉಂಟಾಗುವ ಅತ್ಯಂತ ಕಡಿಮೆ ಬೆಳಗಿನ ಕರಗಿದ ಆಮ್ಲಜನಕ (DO) <4mg/l ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸಲು ಪರಿಹಾರಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸಲು ಲೇಕ್‌ ರಿವೈವ್ ಸಹಾಯ ಮಾಡುತ್ತದೆ." ></Textbox>

        <div className="w-full mt-4 flex flex-col gap-4 sm:gap-0">

          <Zigzagsection
            item_index={1}
            section_image={image_urban_Lake_crisis}
            heading="ನಗರ ಕೆರೆಗಳ ಬಿಕ್ಕಟ್ಟಿಗೆ ಪರಿಹಾರ "
            content="ವೇಗವಾಗಿ ನಗರೀಕರಣಗೊಳ್ಳುತ್ತಿರುವ ಜಲಾನಯನ ಪ್ರದೇಶಗಳ ಕೆರೆಗಳು ಒಳಚರಂಡಿ ಒಳಹರಿವು, ಕೈಗಾರಿಕಾ ಮಾಲಿನ್ಯ ಮತ್ತು ಅತಿಕ್ರಮಣದಿಂದಾಗಿ ಆತಂಕಕಾರಿ ವೇಗದಲ್ಲಿ ನಾಶವಾಗುತ್ತಿವೆ. ಬೆಂಗಳೂರು ಸೇರಿದಂತೆ ಅನೇಕ ನಗರಗಳಲ್ಲಿ, ಹೆಚ್ಚಿನ ನಗರ ಜಲಮೂಲಗಳು ತೀವ್ರ ಅವನತಿಯ ಲಕ್ಷಣಗಳನ್ನು ತೋರಿಸುತ್ತಿವೆ, ಹೆಚ್ಚಿನ ಪೋಷಕಾಂಶಗಳ ಹೊರೆ ಯುಟ್ರೋಫಿಕೇಶನ್, ಆಲ್ಗೆಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಅಸಂಖ್ಯಾತ ಮೀನುಗಳ ಸಾವಿಗೆ ಕಾರಣವಾಗುತ್ತದೆ. ಈ ಸಮಸ್ಯೆಗಳನ್ನು ತಡೆಗಟ್ಟಲು ಲೇಕ್ ರಿವೈವ್ ಸಕಾಲಿಕ ಮಧ್ಯಪ್ರವೇಶ ಪರಿಹಾರ ಕ್ರಮಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ. "></Zigzagsection>

          <Zigzagsection
            item_index={2}
            section_image={image_knowledge_gap}
            heading="ಜ್ಞಾನ-ಅನುಷ್ಠಾನದ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು"
            content="ಕೆರೆ ಪರಿಸರ ವ್ಯವಸ್ಥೆಗಳ ವೈಜ್ಞಾನಿಕ ತಿಳುವಳಿಕೆ ದಿನೇ ದಿನೇ ಹೆಚ್ಚಾಗುತ್ತಿದ್ದರೂ, NbS ನ ಸಂಶೋಧನೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಅನುಷ್ಠಾನದ ನಡುವೆ ಇಂದಿಗೂ ಗಮನಾರ್ಹ ಅಂತರವಿದೆ. ವಿನ್ಯಾಸ ತತ್ವಗಳ ಕೊರತೆಯಿಂದಾಗಿ, ಅನೇಕ ಪುನರುಜ್ಜೀವನ ಯೋಜನೆಗಳು ನಗರ ಕೆರೆಗಳಲ್ಲಿ ಸುಧಾರಿತ ನೀರಿನ ಗುಣಮಟ್ಟ ಮತ್ತು ಜೀವವೈವಿಧ್ಯತೆಯನ್ನು ಸಾಧಿಸಲು ವಿಫಲವಾಗಿವೆ. ಲೇಕ್‌ ರಿವೈವ್ ಸಂಕೀರ್ಣ ವೈಜ್ಞಾನಿಕ ತತ್ವಗಳನ್ನು ಕಾರ್ಯಸಾಧ್ಯ ಶಿಫಾರಸುಗಳಾಗಿ ಮಾರ್ಪಡಿಸುವ ಮೂಲಕ ಈ ಅಂತರವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ."></Zigzagsection>

          <Zigzagsection
            item_index={3}
            section_image={image_democratic_lake_conservation}
            heading="ಕೆರೆ ಸಂರಕ್ಷಣೆಯನ್ನು ಪ್ರಜಾಪ್ರಭುತ್ವಗೊಳಿಸುವುದು"
            content="ಕೆರೆಯ ಪುನರುಜ್ಜೀವನಕ್ಕೆ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ವಿಶೇಷ ಪರಿಣತಿಯ ಅಗತ್ಯವಿರುತ್ತದೆ, ಸ್ಥಳೀಯ ಸಮುದಾಯಗಳು ಮತ್ತು ಸಣ್ಣ ಸಂಸ್ಥೆಗಳಿಗೆ ಸಾಮಾನ್ಯವಾಗಿ ವಿಶೇಷ ಪರಿಣತಿಯು ಇರುವುದಿಲ್ಲ. ಎಲ್ಲರಿಗೂ ವೈಜ್ಞಾನಿಕ ನಿರ್ಧಾರ ಮಾಡಲು ಅನುಕೂಲ ಮಾಡಿಕೊಡುವ ಮೂಲಕ ಲೇಕ್‌ ರಿವೈವ್ ಈ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಜಾಪ್ರಭುತ್ವಗೊಳಿಸುತ್ತದೆ. ಸ್ಥಳೀಯ ಪಾಲುದಾರರು ತಮ್ಮ ನೆರೆಯ ಕೆರೆಗಳ ಉಳಿವಿಗೆ ಅರ್ಥಪೂರ್ಣ ಕ್ರಮಗಳನ್ನು  ತೆಗೆದುಕೊಳ್ಳಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ. "></Zigzagsection>

          <Zigzagsection
            item_index={4}
            section_image={image_policy}
            heading="ಸಾಕ್ಷ್ಯ ಆಧಾರಿತ ನೀತಿಗೆ ಬೆಂಬಲ"
            content={<><p>ಈ ಉಪಕರಣವು ಕೆರೆಯ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸುವಲ್ಲಿ NbSನ ಪರಿಣಾಮಕಾರಿತ್ವದ ಕುರಿತು ಸಾಕ್ಷ್ಯಗಳನ್ನು ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಇದು ಸಾಕ್ಷ್ಯ/ಪುರಾವೆ ಆಧಾರಿತ ನೀತಿಗಳನ್ನು ರೂಪಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಪುರಾವೆಗಳನ್ನು ರೂಪಿಸಲು ಸಮುದಾಯಗಳು ಕೆರೆಯ ಆರೋಗ್ಯ ಸ್ಕೋರ್ ಕಾರ್ಡ್ ಅನ್ನು ಬಳಸಬಹುದು. ಇದಕ್ಕಾಗಿ ಲಿಂಕ್ಅನ್ನು <Link className="text-green-600" href={'/lhi'} target="_blank"> ಸರೋವರದ/ಕೆರೆಯ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ ಪುಟದಲ್ಲಿ ನೀಡಲಾಗಿದೆ.</Link></p>
            </>}
          ></Zigzagsection>

          <Zigzagsection
            item_index={5}
            section_image={image_ecosystem_service}
            heading="ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ಸೇವೆಗಳ ಸಂರಕ್ಷಣೆ"
            content="ಕೆರೆಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸುವ ಕೆಲಸ ಮಾನಸಿಕ ಯೋಗಕ್ಷೇಮವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ. ಪ್ರಾಕೃತಿಕ ಸ್ಥಳಗಳಲ್ಲಿ ಸಮಯ ಕಳೆಯುವುದು ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ, ಮನ:ಸ್ಥಿತಿಯನ್ನು ಉತ್ತಮವಾಗಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರಕೃತಿಯೊಂದಿಗೆ ನಮ್ಮ ಸಂಪರ್ಕದ ಪ್ರಜ್ಞೆಯನ್ನು ಬೆಳೆಸುತ್ತದೆ ಎಂದು ಅಧ್ಯಯನಗಳು ಸಾರುತ್ತವೆ. ಪುನರುಜ್ಜೀವಿತ ಕೆರೆಗಳು ಮನರಂಜನೆ, ಆತ್ಮಾವಲೋಕನ ಮತ್ತು ಕಲಿಕೆಯ ಸಮುದಾಯ ಕೇಂದ್ರಗಳಾಗಿವೆ."></Zigzagsection>

        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex justify-center items-center mt-4">
            <Heading customClassname="text-3xl" text="ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?"></Heading>
          </div>

          <div className="flex flex-col gap-10 lg:gap-15 mt-5">
            <Homesteps
              step_image={image_step_1}
              heading=" ಕೆರೆಯ ಮೂಲ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ"
              heading_mob="ಹಂತ 1: ಕೆರೆಯ ಮೂಲ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ"
              content={`ನಿಮ್ಮ ವಿವರವಾದ ಯೋಜನಾ ವರದಿಯಿಂದ (DPR) ಕೆರೆಯ ಮೂಲಭೂತ ಗುಣಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ:
            • ಸರೋವರದ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ (m²)
            • ಸರಾಸರಿ ಆಳ (m)
            • ನೀರಿನ ಗುಣಮಟ್ಟದ ನಿಯತಾಂಕಗಳು [ ಒಟ್ಟು ರಂಜಕ (TP) ಮಟ್ಟಗಳು ] 
            • NbSಅನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಲಭ್ಯವಿರುವ ಪ್ರದೇಶ`} />

            <Homesteps
              step_image={image_step_2}
              heading="ಒಳಹರಿವಿನ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ"
              heading_mob="ಹಂತ 2: ಒಳಹರಿವಿನ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ"
              content={`ಕೆರೆಯನ್ನು ಪ್ರವೇಶಿಸುವ ನೀರಿನ ಬಗ್ಗೆ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ:
               • ಒಳಹರಿವಿನ ಪ್ರಮಾಣ (KLD ಅಥವಾ m³/ದಿನ)
               • ಒಳಹರಿವಿನ ನೀರಿನ ಗುಣಮಟ್ಟ (TP ಮಟ್ಟಗಳು)`} />

            <Homesteps
              step_image={image_step_3}
              heading=" ಸ್ವಯಂಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ"
              heading_mob="ಹಂತ 3:  ಸ್ವಯಂಚಾಲಿತ ವಿಶ್ಲೇಷಣೆ"
              content={`ನಂತರ ಉಪಕರಣವು ಈ ಮಾಹಿತಿಯನ್ನು ವಿಶೇಷ ಅಲ್ಗಾರಿದಮ್‌ಗಳ ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ
              • ಪೋಷಕಾಂಶ ಲೋಡಿಂಗ್ ದರಗಳನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ
              • ಗುರಿ ನೀರಿನ ಗುಣಮಟ್ಟವನ್ನು ಸಾಧಿಸಲು ತೆಗೆದುಹಾಕುವ ಅವಶ್ಯಕತೆಗಳನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ
              • ಲಭ್ಯವಿರುವ ಸ್ಥಳ ಮತ್ತು ಕೆರೆಯ ರೂಪವಿಜ್ಞಾನದ ಆಧಾರದ ಮೇಲೆ ವಿಭಿನ್ನ NbSನ ಕಾರ್ಯಸಾಧ್ಯತೆಯನ್ನು ನಿರ್ಣಯಿಸುತ್ತದೆ`} />

            <Homesteps
              step_image={image_step_4}
              heading="ಪರಿಹಾರದ ಶಿಫಾರಸು"
              heading_mob="ಹಂತ 4: ಪರಿಹಾರದ ಶಿಫಾರಸು"
              content={`ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದ ಮೇಲೆ ಲೇಕ್‌ ರಿವೈವ್ ಪರಿಹಾರವನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ:
               • ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶ (CW) ಅಥವಾ ತೇಲುವ ದ್ವೀಪಗಳು (FI) ಅಥವಾ ಎರಡರ ಸಂಯೋಜನೆಗೆ ಸ್ಪಷ್ಟ ಶಿಫಾರಸು
               •  ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರದ ಅಗತ್ಯವಿರುವ ಗಾತ್ರ ಮತ್ತು ಸಂರಚನೆ
               • ನಿರೀಕ್ಷಿತ ಪೋಷಕಾಂಶ ತೆಗೆಯುವ ದಕ್ಷತೆ
               •  ಪ್ರಮಾಣಿತ NbS ಸಾಕಷ್ಟಿಲ್ಲದಿದ್ದರೆ ಪರ್ಯಾಯ ವಿಧಾನಗಳು `} />

            <Homesteps
              step_image={image_step_5}
              heading="ಅನುಷ್ಠಾನ ಮಾರ್ಗದರ್ಶನ"
              heading_mob="ಹಂತ 5: ಅನುಷ್ಠಾನ ಮಾರ್ಗದರ್ಶನ"
              content={`ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರವನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಈ ಉಪಕರಣವು ಪ್ರಾಯೋಗಿಕ ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ:
              • ನಿರ್ಮಿತ ಜೌಗು ಪ್ರದೇಶ (CW)/ತೇಲುವ ದ್ವೀಪಗಳಿಗಾಗಿ (FI) ವಿನ್ಯಾಸ ನಿಯತಾಂಕಗಳು
              • ಸಸ್ಯ ಜಾತಿಗಳ ಶಿಫಾರಸುಗಳು
              • ನಿರ್ವಹಣೆ ಅವಶ್ಯಕತೆಗಳು`} />


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

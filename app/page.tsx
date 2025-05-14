'use client';

import Image from "next/image";
import Link from "next/link";
import Heading from "./Components/Heading";
import SubHeading from "./Components/SubHeading";
import dynamic from 'next/dynamic';
import website_amin from '@/public/website-working.json';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Home() {
  return (
    <main>
      <div className="flex flex-col w-full p-8 justify-center items-center">
        <div className="w-[300px]">
          <Lottie animationData={website_amin} autoplay loop />
        </div>
        <Heading text="The home page of this app is under progress." />
        <SubHeading text="Please skip to the tool page" />
        <Link
          className="bg-blue-200 p-4 shadow-2xl text-xl font-semibold rounded-xl mt-4"
          href="/tool"
        >
          Open Tool page
        </Link>
      </div>
    </main>
  );
}

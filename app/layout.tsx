
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./Components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import { Languageprovider } from "./Components/Languagecontex";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const getpoppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LakeRevive",
  description: "innovative decision-support tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XBV86N6QL2"></Script>
<Script>{`
 
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XBV86N6QL2'); `}
</Script>
      </head>
      <body 
        className={`${geistSans.variable} ${getpoppins.className} antialiased  `}
      >
        <Languageprovider>
       
        {children}
        </Languageprovider>
        <Analytics></Analytics>

         <div className=" flex w-full h-20 flex-col-reverse mt-10 ">
          <Footer />
         </div>
        
    

      </body>

    </html>
  );
}

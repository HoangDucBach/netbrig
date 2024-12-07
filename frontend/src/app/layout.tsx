import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import { Suspense } from 'react'

import "./globals.css";
import Providers from "./providers";
import utils from "@/utils";
import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = dynamic(() => import("./_components/Navbar").then((mod) => mod.Navbar), {
  ssr: false,
});

export const metadata: Metadata = {
  title: utils.constants.APP_NAME,
  description: utils.constants.APP_DESCRIPTION,
};

const plusJakartaSans = Plus_Jakarta_Sans({
  display: "auto",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Flex direction={"column"} padding={"4"} width={"full"} height={"svh"} flex={"1"}>
              <ToastContainer theme="dark" />
              <Navbar />
              <Flex flex={"1"} position={"relative"}>
                {children}
              </Flex>
            </Flex>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

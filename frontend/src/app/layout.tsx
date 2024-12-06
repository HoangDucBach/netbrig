import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'

import "./globals.css";
import Providers from "./providers";
import utils from "@/utils";
import { Navbar } from "./_components/Navbar";
import { Box, Flex } from "@chakra-ui/react";
import { Toolbar } from "./_components/Toolbar";


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
      <body
        className={`antialiased ${plusJakartaSans.className}`}
      >
        <Providers>
          <Flex direction={"column"} padding={"4"} width={"full"} height={"svh"} flex={"1"}>
            <Navbar />
            <Flex flex={"1"} position={"relative"}>
              <Toolbar />
              {children}
            </Flex>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}

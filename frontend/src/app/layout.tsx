import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'

import "./globals.css";
import Providers from "./providers";
import utils from "@/utils";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./_components/Navbar").then((mod) => mod.Navbar), {
  ssr: false,
});

const Panel = dynamic(() => import("./_components/Panel").then((mod) => mod.Panel), {
  ssr: false,
});

const Toolbar = dynamic(() => import("./_components/Toolbar").then((mod) => mod.Toolbar), {
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
          <Flex direction={"column"} padding={"4"} width={"full"} height={"svh"} flex={"1"}>
            <Navbar />
            <Flex flex={"1"} position={"relative"}>
              <Toolbar />
              <Panel />
              {children}
            </Flex>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
